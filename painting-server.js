/* TO DO 

Set up modules for private route access
 
ASK RANDY ABOUT THE ERASID THING FOR THE 4TH LAST ROUTE*****

*/


const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();
const supaUrl = 'https://jvoirkgcqrriymwwoigq.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b2lya2djcXJyaXltd3dvaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MzAzODksImV4cCI6MjA1NTMwNjM4OX0.Ww69yn3DZ03G2xmHOQR_FgtQLo8ZgLhpbkjCpXdmw4s';
const supabase = supa.createClient(supaUrl, supaAnonKey);

/* =========== ERAS API =========== */
app.get('/api/eras', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('eras')
            .select(`*`);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No eras found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

/* =========== GALLERIES API =========== */
app.get('/api/galleries', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('galleries')
            .select(`*`);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No galleries found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/galleries/:id', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('galleries')
            .select(`*`)
            .eq('galleryId', req.params.id )
        
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `Gallery with ID ${req.params.id} not found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/galleries/country/:substring', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('galleries')
            .select(`*`)
            .ilike('galleryCountry', `${req.params.substring}%`);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No galleries found in the countries starting with ${req.params.substring}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

/* =========== ARTISTS API =========== */
app.get('/api/artists', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('artists')
            .select(`*`);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No artists found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/artists/:id', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('artists')
            .select(`*`)
            .eq('artistId', req.params.id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `Artist with ID ${req.params.id} not found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/artists/search/:substring', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('artists')
            .select()
            .ilike('lastName', `${req.params.substring}%`);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No artists found with the last name starting with ${req.params.substring}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/artists/country/:substring', async (req, res) => {
    try {    

        const {data, error} = await supabase
            .from('artists')
            .select()
            .ilike('nationality', `${req.params.substring}%`);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No artists found with from countries starting with ${req.params.substring}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

/* =========== PAINTINGS API =========== */

/* Contains all painting fields not including foreign keys */
const paintingFields = `paintingId,          
                        imageFileName,
                        title,
                        shapeId,
                        museumLink,
                        accessionNumber,
                        copyrightText,
                        description,
                        excerpt,
                        yearOfWork,
                        width,
                        height,
                        medium,
                        cost,
                        MSRP,
                        googleLink,
                        googleDescription,
                        wikiLink,
                        jsonAnnotations`;

app.get('/api/paintings', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/sort/:field', async (req, res) => { 
    try {    
        let { field} = req.params;

        if (field === 'year') {
            field = 'yearOfWork';
        }

        if (!['title', 'yearOfWork'].includes(field)) {
            return res.status(400).json({ error: "Invalid sort field. Use 'title' or 'yearOfWork'." });
        }

        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .order(field, {ascending: true})

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `Invalid sort field. Use either 'title' or 'yearOfWork'.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
}); 

app.get('/api/paintings/:id', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .eq('paintingId', req.params.id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `Painting with ID ${req.params.id} not found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/search/:substring', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .ilike('title', `%${req.params.substring}%`)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found containing ${req.params.substring} in the title.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/years/:start/:end', async (req, res) => {
    try {    

        if (req.params.start > req.params.end) {
            return res.status(500).json( {error: "Invalid Range: The start year must be before or equal to the end year."});
        }

        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .gte("yearOfWork", req.params.start)
            .lte("yearOfWork", req.params.end)
            .order("yearOfWork",{ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found between ${req.params.start} and ${req.params.end}`});
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 
    }
});

app.get('/api/paintings/galleries/:id', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .eq("galleryId", req.params.id)
            .order("title", {ascending: true});


        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found in gallery with ID ${req.params.id}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 
    }
});

app.get('/api/paintings/artist/:id', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .eq("artistId", req.params.id)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found for artist with ID ${req.params.id}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 
    }
});

app.get('/api/paintings/artist/country/:substring', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(` 
                ${paintingFields},
                artists!inner(artistId, nationality)
            `)
            .ilike("artists.nationality", `${req.params.substring}%`)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found by artists from countries starting with ${req.params.substring}.`})
        }

        return res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

/* =========== GENRES API =========== */
app.get('/api/genres', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('genres')
            .select(`
                *,
                eras(*)
            `);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No genres found`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }   
});

app.get('/api/genres/:id', async (req, res) => {
    try {    

        const {data, error} = await supabase
            .from('genres')
            .select(`
                *,
                eras(*)
            `)
            .eq("genreId", req.params.id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `Genre with ID ${req.params.id} not found.`});
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/genres/painting/:id', async (req, res) => { 
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                genres(*, eras(*))
            `)
            .eq("paintingId", req.params.id)
            .order("genres(genreName)", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No genres found for painting with ID ${req.params.id}.`});
        }

        return res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/genre/:id', async (req, res) => { 
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                paintings (paintingId, title, yearOfWork)
            `)
            .eq("genreId", req.params.id)
            .order("paintings(yearOfWork)", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found for genre with ID ${req.params.id}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/era/:id', async (req, res) => { /* This works now, but talk to Randy about needing to select eraId for it to work?? */
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                paintings(paintingId, title, yearOfWork), genres!inner (eraId)
            `)
            .eq("genres.eraId", req.params.id)
            .order("paintings(yearOfWork)", { ascending: true});


        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No paintings found for era with ID ${req.params.id}.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

/* =========== COUNTS API =========== */
app.get('/api/counts/genres', async (req, res) => { /* also not working? */
    try {    
        const {data, error} = await supabase
            .from('genres')
            .select(`
                genreName, paintinggenres(genreId)
            `)


        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const genreCounts = data.map(genre => ({
            genreName: genre.genreName,
            paintingCount: genre.paintinggenres.length
        }));

        genreCounts.sort((a,b) => a.paintingCount - b.paintingCount);

        if (!genreCounts || genreCounts.length === 0) {
            return res.status(404).json({error: `No genres found with paintings.`})
        }

        res.json(genreCounts);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/counts/artists', async (req, res) => { /* also not working? */
    try {    
        const {data, error} = await supabase
            .from('artists')
            .select(`
                firstName, lastName, paintings(paintingId)
            `);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const artistCounts = data.map(artist => ({
            artistName: `${artist.firstName} ${artist.lastName}` ,
            paintingCount: artist.paintings.length
        }));

        if (!artistCounts || artistCounts.length === 0) {
            return res.status(404).json({error: `No artists found with paintings.`})
        }

        artistCounts.sort((a,b) => b.paintingCount - a.paintingCount);
        res.json(artistCounts);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/counts/topgenres/:threshold', async (req, res) => { /* also not working? */
    try {    
        const {data, error} = await supabase
            .from('genres')
            .select(`
                genreName, paintinggenres(genreId)
            `)

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const genreCounts = data.map(genre => ({
            genreName: genre.genreName,
            paintingCount: genre.paintinggenres.length
        }));

        genreCounts.sort((a,b) => a.paintingCount - b.paintingCount);
        const topGenres = genreCounts.filter(a => a.paintingCount > req.params.threshold); /* filters only for genres with painting count greater than threshold */

        if (!topGenres || topGenres.length === 0) {
            return res.status(404).json({error: `No genres found with more than ${req.params.threshold} paintings.`})
        }

        res.json(topGenres);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

let hostURL = "http://localhost:8070"
app.listen(8070, () => {
    console.log('listening on port 8070');
    console.log(hostURL + '/api/eras');
    console.log(hostURL + '/api/galleries');
    console.log(hostURL + '/api/galleries/30');
    console.log(hostURL + '/api/galleries/Calgary');
    console.log(hostURL + '/api/galleries/country/fra');
    console.log(hostURL + '/api/artists');
    console.log(hostURL + '/api/artists/12');
    console.log(hostURL + '/api/artists/1223423');
    console.log(hostURL + '/api/artists/search/ma');
    console.log(hostURL + '/api/artists/search/mA');
    console.log(hostURL + '/api/artists/country/fra');
    console.log(hostURL + '/api/paintings');
    console.log(hostURL + '/api/paintings/sort/year');
    console.log(hostURL + '/api/paintings/63');
    console.log(hostURL + '/api/paintings/search/port');
    console.log(hostURL + '/api/paintings/search/pORt');
    console.log(hostURL + '/api/paintings/search/connolly');
    console.log(hostURL + '/api/paintings/years/1800/1850');
    console.log(hostURL + '/api/paintings/galleries/5');
    console.log(hostURL + '/api/paintings/artist/16');
    console.log(hostURL + '/api/paintings/artist/666');
    console.log(hostURL + '/api/paintings/artist/country/ital');
    console.log(hostURL + '/api/genres');
    console.log(hostURL + '/api/genres/76');
    console.log(hostURL + '/api/genres/painting/408');
    console.log(hostURL + '/api/genres/painting/jsdfhg');
    console.log(hostURL + '/api/paintings/genre/78');
    console.log(hostURL + '/api/paintings/era/2');
    console.log(hostURL + '/api/counts/genres');
    console.log(hostURL + '/api/counts/artists');
    console.log(hostURL + '/api/counts/topgenres/20');
    console.log(hostURL + '/api/counts/topgenres/2034958)');
});