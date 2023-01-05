import fs from "fs";
import path from "path";
import puppeteer from 'puppeteer';
import handlebars from "handlebars";

type Person = {
    firstName: string;
    lastName: string;
    jedi: boolean;
}

type PdfData = {
    title: string;
    date: string;
    people: Person[];
}

export async function createPDF(data: PdfData) {
    const templateHtml = fs.readFileSync(path.join(process.cwd(), 'pdf-template.html'), 'utf8');
    const template = handlebars.compile(templateHtml);
    const html = template(data);

    const now = new Date();
	const milis = now.getTime();
	const pdfPath = path.join('pdf', `${data.title}-${milis}.pdf`);

    let options = {
        width: '1230px',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "10px",
            bottom: "30px"
        },
        printBackground: true,
        path: pdfPath
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });

    const page = await browser.newPage();
    await page.setContent(`${html}`, {waitUntil: 'networkidle0'});
    await page.pdf(options);
    await browser.close();

    return html;
}
