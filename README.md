# Barcode Scanner

A barcode scanner web app that looks up food products and tracks shelf life.

## How It Works

You can visit the live site at https://reioliveros.github.io/barcode-scanner/ on your computer or phone. It is possible to add this web app to your home screen if you use Safari on iPhone by going to Share > Add To Home Screen.

<img width="1113" height="881" alt="screenshot of barcode scanner website, displaying an unknown scanned barcode and a save form underneath" src="https://github.com/user-attachments/assets/7a16ad79-6db2-4b61-9c67-12930d5b90e2" />

Once a barcode is detected and scanned, it is looked up in the [Open Food Facts](https://world.openfoodfacts.org/) API and requests information like the name and brand of the product. From there, users can input a shelf life amount and save it in their history where future scans can redisplay the product's saved shelf life.

<img width="1115" height="493" alt="screenshot of barcode scanner website's history section, saving previously scanned barcodes" src="https://github.com/user-attachments/assets/d42b6ad6-a5d6-4ddc-b2b7-8e7a6302ca82" />

Users are able to delete or edit the data. A barcode can be searched again to see its image if it has one. Since I am mainly planning on using this for personal use, I have an export button to extract all the barcodes I've scanned to put them into a file in the source files as a more permanent space for the product data.

#### Limitations

The information is being pulled from a **food database** which means non-food products will not be found. Also, the shelf life values are **estimates** and are entered by yourself which is not food safety advice. The barcode library uses the internet, so a connection is needed to be able to scan and lookup a barcode. Product data is only saved to localStorage, so once you clear your browsing data, it also clears the website's data for the products.

## Features
- Camera scanning
- Manual entry
- [Open Food Facts](https://world.openfoodfacts.org/) lookup
- Scan history
- Your own shelf life dates with a Use By date

## Tech Stack
- React.js
- Vite
- barcode-detector
- lucide-react

## About

This is a project that I thought of while working at a bakery. We would have to constantly scan items and then look into a binder to find their marked shelf life. Then we would have to calculate what that day would be and label the items as such. I found it all to be a little tedious, especially for someone that has been there for only a month or two. I would often find myself asking Siri what date is x amount of days away

Working on this project has taught me a lot about using React.js. I did use Claude AI to help guide me through the steps of creating such an app, but no code was ever copy and pasted from the AI. I wanted this to be purely educational and did not want the whole thing to be vibe coded. In doing so, I hope in the future I can do whole projects without any use of AI at all! Or maybe once I completely understand what I'm doing, I can fully use AI efficiently.

I still learned a lot from building this project such as the use of states, creating custom hooks, using localStorage, etc.. Working on this project has given me much more confidence in my ability to use React.js and I hope to keep learning more and creating more impactful projects!


## Run It Locally
```
git clone https://github.com/reioliveros/barcode-scanner.git
cd barcode-scanner
npm install
npm run dev
```

## Open Food Facts

This is not an official or affiliated project with Open Food Facts. I just wanted to say thank you to Open Food Facts for their API. You can find more about them on their website at https://world.openfoodfacts.org/ You can also contribute to their project by scanning food products you have at home and inputting their information. By doing so, you are also expanding the products that can be scanned with this scanner.
