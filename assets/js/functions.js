const API_HOST = 'https://restcountries.eu/rest/v2';

    const getAllCountries = async() =>{
    
        const url = `${API_HOST}/all`;
        const data = await fetch(url)
        const response = await data.json()
    
        response.map((item)=>{
            $("#search").append('<option value="'+item.name+'">'+item.name+'</option>');
            $("#imagen").attr("src",`${item.flag}`);
        })
        handleChange()
    }

    getAllCountries()
   
    const handleChange = async() => {

        $("#country-languages").empty();
        $("#country-border").empty();
        const country = $("#search").val() 

        const url = `${API_HOST}/name/${country}`; 
        const data = await fetch(url)
        const response = await data.json()

        response.map((item)=>{
            $("#imagen").attr("src",`${item.flag}`);
            $("#country-name").text(item.name);
            $("#country-capital").text(item.capital);
            $("#country-region").text(item.region);
            
            item.languages.map((idioma) => {
                 console.log(idioma.name)
                
                $("#country-languages").append('<li>'+idioma.name+','+'</li>');
               
            })

            item.currencies.map((currencies) => {
                $("#country-currencies").text(currencies.name);
                $("#country-symbol").text(currencies.symbol);
            })
            
            item.borders.map(async(border)=>{
            
                const url = `${API_HOST}/alpha/${border}`;
                const data = await fetch(url)
                const response = await data.json() 
                $("#country-border").append('<li>'+response.name+','+'</li>');

            })
            
        })
    }

   