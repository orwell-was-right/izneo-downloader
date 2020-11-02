#!/usr/bin/env node

const { subtle } = require('crypto').webcrypto;
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const archiver = require('archiver');

const COOKIE = process.env.IZNEO_COOKIE;
const [,, ...args] = process.argv;

const ID = args[0].includes('izneo') ? args[0].split('/read/')[0].split('-').reverse()[0] : args[0];

if(!COOKIE) {
	console.log(`Error: The 'IZNEO_COOKIE' environment variable is not set`);
	process.exit(-1);
}

if(!ID) {
	console.log('Error: Please provide a book ID!');
	process.exit(-1);
}

const makeBuffer = e => {
	for (var t = Buffer.from(e, 'base64').toString('binary'), n = t.length, i = new Uint8Array(n), o = 0; o < n; o++) i[o] = t.charCodeAt(o);
	return i.buffer
}

const downloadPage = async (page, location) => {
	const pageNumber = page.albumPageNumber;
	const res = await fetch(`https://www.izneo.com/book/${ID}/${pageNumber}?type=full`, { headers: { COOKIE } });
	const encodedImage = await res.buffer();

	const imp = await subtle.importKey('raw', makeBuffer(page.key), 'AES-CBC', true, ['decrypt']);
	const dec = await subtle.decrypt({ name: 'AES-CBC', iv: makeBuffer(page.iv) }, imp, encodedImage);

	fs.writeFileSync(path.join(location, `${String(pageNumber).padStart(3, '0')}.jpg`), Buffer.from(dec), 'binary');
}

const zip = async location => {
	const output = fs.createWriteStream(`${location}.cbz`);
	const archive = archiver('zip', { zlib: { level: 9 } });
	archive.pipe(output);

	output.on('close', () => { 
		console.log(`Successfully saved as: ${location}.cbz`);
		fs.rmdirSync(location, { recursive: true });
	});

	archive.directory(location, false);
	archive.finalize();
}

const downloadBook = async() => {
	const book = await fetch(`https://www.izneo.com/book/${ID}`, { headers: { COOKIE } });
	const { data } = await book.json();
	console.log(`Downloading ${ID} - ${data.title}: ${data.subtitle}`);
	const location = path.join(process.cwd(), data.title, data.subtitle);
	fs.mkdirSync(location, { recursive: true })

	await Promise.all(data.pages.map(p => downloadPage(p, location)));
	await zip(location);
}

downloadBook();
