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
        .select();
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
        .eq('galleryId', req.params.ref);
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
        .select();
        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/sort/:title|year', async (req, res) => { /* DO THIS ONE WHEN YOU UNDERSTAND HOW*/
    try {    
        const {data, error} = await supabase
        .from('paintings')
        .select();
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
        .select()
        .eq('paintingId', req.params.ref);
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
        .select()
        .ilike('title', `%${req.params.substring}%`);
        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/years/:start/:end', async (req, res) => {
    try {    
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .gte("yearOfWork", req.params.start)
        .lte("yearOfWork", req.params.end)
        .order("yearOfWork",{ascending: true});
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
        .select()
        .eq("galleryId", req.params.ref)
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
        .select()
        .eq("artistId", req.params.ref)
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
            *, 
            artists!inner(artistId, nationality, firstName, lastName)
        `)
        .ilike("artists.nationality", `${req.params.ref}%`);

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
        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/genres/painting/:ref', async (req, res) => { /* also not working? --- STILL NOW WOKRING */
    try {    
        const {data, error} = await supabase
            .from('paintingGenres')
            .select(`
                genres(genreName),
                paintings!inner(paintingId, title)
            `)
            .eq("paintingId", req.params.ref)
            .order("genreId", {ascending: true});

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

app.get('/api/paintings/genre/:ref', async (req, res) => { /* also not working? */
    try {    
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .eq("genreId", req.params.ref)
        .order("genreName", {ascending: true});
        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

app.get('/api/paintings/era/:ref', async (req, res) => { /* also not working? */
    try {    
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .eq("genreId", req.params.ref)
        .order("genreName", {ascending: true});
        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
});

let hostURL = "http://localhost:8080"
app.listen(8080, () => {
    console.log('listening on port 8080');
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