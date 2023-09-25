const express = require('express');



const app = express();
const port = 8080 || process.env.PORT;

app.use(express.json());


const wishlist = require('./wishlist.js');
const alpha2 = wishlist.countries.map((codeFind)=> codeFind.alpha2Code);
const alpha3 = wishlist.countries.map((codeFind)=> codeFind.alpha3Code);





app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

// PART 1: display list of countries



app.get('/api/countries', (req, res) => {


res.send(`<h1>Countries I want to visit:</h1><ul>${wishlist.countries.map((index)=> `<li>${index.name}</li>`).join('')}
</ul>`)

})


// PART 2: accept JSON data and add the new country received to the list of countries
//STILL NEED TO ADD TO ARRAY!

app.post('/api/countries',  (req, res) => {
    res.json({
        id: 0,
        name: "Name",
        alpha2Code: "NM",
        alpha3Code: "NAM"
      })
  })

 

  // PART 3: return a single country, based on the code (both an alpha 2 or an alpha 3 code)


      app.get('/api/countries/:code', (req, res) => {
        const code = req.params.code;
       
       
        res.json(alpha2.includes(`${code}`) || alpha3.includes(`${code}`) ? wishlist.countries.filter((country) => country.alpha2Code === `${code}` || country.alpha3Code === `${code}`) : 'No results.');    
        });



    //   PART 4: accept edits to an existing country in the list 

    app.put('/api/countries/:code', (req, res) => {
        const code = req.params.code;

        const data = alpha2.includes(`${code}`) || alpha3.includes(`${code}`) ? wishlist.countries.filter((country) => country.alpha2Code === `${code}` || country.alpha3Code === `${code}`) : null;
            console.log(data[0].name);


        res.json(`PUT Request for ` + data[0].name + ` called`);

    })

    // PART 5: delete a specific country from the list

    app.delete('/api/countries/:code', (req, res) => {
        const code = req.params.code;
     
        const data = alpha2.includes(`${code}`) || alpha3.includes(`${code}`) ? wishlist.countries.filter((country) => country.alpha2Code === `${code}` || country.alpha3Code === `${code}`) : null;
          
        
        const findIndex = (element) => element.alpha2Code === code || element.alpha3Code === code;
        const indexToDelete = wishlist.countries.findIndex(findIndex)
        console.log(indexToDelete);
        if (indexToDelete >= 0) {
            wishlist.countries.splice(indexToDelete, 1);
          }

        res.json(data[0].name + ' removed'); 
        console.log(wishlist.countries)
   
        });


  