/* TO DO 

Complete the readme.md, with routes
Set up modules for private route access
review each query for correct data aggregation
create & run server in render.com
add start and end date error checking with custom message

take out all foreign keys from the painting routes


ASK HIM 

ASK RANDY ABOUT THE ERASID THING FOR THE 4TH LAST ROUTE*****



*/


const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();
const supaUrl = 'https://jvoirkgcqrriymwwoigq.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b2lya2djcXJyaXltd3dvaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MzAzODksImV4cCI6MjA1NTMwNjM4OX0.Ww69yn3DZ03G2xmHOQR_FgtQLo8ZgLhpbkjCpXdmw4s';
const supabase = supa.createClient(supaUrl, supaAnonKey);

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

/* =========== ERAS API =========== */
app.get('/api/eras', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('eras')
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
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
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/galleries/:ref', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('galleries')
            .select()
            .eq('galleryId', req.params.ref )
        
        if (error) {
            return res.status(500).json({ error: error.message });
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
            .select()
            .ilike('galleryCountry', `${req.params.substring}%`);

        if (error) {
            return res.status(500).json({ error: error.message });
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
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/artists/:ref', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('artists')
            .select()
            .eq('artistId', req.params.ref);

        if (error) {
            return res.status(500).json({ error: error.message });
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

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

/* =========== PAINTINGS API =========== */
app.get('/api/paintings', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/sort/:sortField', async (req, res) => { 
    try {    
        let { sortField} = req.params;

        if (sortField === 'year') {
            sortField = 'yearOfWork';
        }

        if (!['title', 'yearOfWork'].includes(sortField)) {
            return res.status(400).json({ error: "Invalid sort field. Use 'title' or 'yearOfWork'." });
        }

        const {data, error} = await supabase
                .from('paintings')
                .select(paintingFields)
                .order(sortField, {ascending: true})

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
}); 

app.get('/api/paintings/:ref', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .eq('paintingId', req.params.ref);

        if (error) {
            return res.status(500).json({ error: error.message });
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

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/years/:start/:end', async (req, res) => {
    try {    

        if (req.params.start > req.params.end) return res.status(500).json( {error: "The inputted end date occurs before the start date"})
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .gte("yearOfWork", req.params.start)
            .lte("yearOfWork", req.params.end)
            .order("yearOfWork",{ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/galleries/:ref', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(paintingFields)
            .eq("galleryId", req.params.ref)
            .order("title", {ascending: true});


        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 
    }
});

app.get('/api/paintings/artist/:ref', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(`paintingFields`)
            .eq("artistId", req.params.ref)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 
    }
});

app.get('/api/paintings/artist/country/:ref', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('paintings')
            .select(` 
                ${paintingFields},
                artists!inner(artistId, nationality)
            `)
            .ilike("artists.nationality", `${req.params.ref}%`)
            .order("title", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
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
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }   
});

app.get('/api/genres/:ref', async (req, res) => {
    try {    

        const {data, error} = await supabase
            .from('genres')
            .select()
            .eq("genreId", req.params.ref);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/genres/painting/:ref', async (req, res) => { 
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                genres(genreName)
            `)
            .eq("paintingId", req.params.ref)
            .order("genres(genreName)", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/genre/:ref', async (req, res) => { 
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                paintings (paintingId, title, yearOfWork)
            `)
            .eq("genreId", req.params.ref)
            .order("paintings(yearOfWork)", {ascending: true});

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/era/:ref', async (req, res) => { /* This works now, but talk to Randy about needing to select eraId for it to work?? */
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                paintings(paintingId, title, yearOfWork), genres!inner (eraId)
            `)
            .eq("genres.eraId", req.params.ref)
            .order("paintings(yearOfWork)", { ascending: true});


        if (error) {
            return res.status(500).json({ error: error.message });
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

        artistCounts.sort((a,b) => b.paintingCount - a.paintingCount);
        res.json(artistCounts);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/counts/topgenres/:ref', async (req, res) => { /* also not working? */
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
        const topGenres = genreCounts.filter(a => a.paintingCount > req.params.ref); /* filters only for genres with painting count greater than ref number */

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