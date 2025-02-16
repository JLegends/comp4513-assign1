const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();
const supaUrl = 'https://jvoirkgcqrriymwwoigq.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b2lya2djcXJyaXltd3dvaWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3MzAzODksImV4cCI6MjA1NTMwNjM4OX0.Ww69yn3DZ03G2xmHOQR_FgtQLo8ZgLhpbkjCpXdmw4s';
const supabase = supa.createClient(supaUrl, supaAnonKey);

/* =========== ERAS API =========== */
app.get('/api/eras', async (req, res) => {
    const {data, error} = await supabase
    .from('eras')
    .select();
    res.send(data);
});

/* =========== GALLERIES API =========== */
app.get('/api/galleries', async (req, res) => {
    const {data, error} = await supabase
    .from('galleries')
    .select();
    res.send(data);
});

app.get('/api/galleries/:ref', async (req, res) => {
    const {data, error} = await supabase
    .from('galleries')
    .select()
    .eq('galleryId', req.params.ref);
    res.send(data);
});

app.get('/api/galleries/country/:substring', async (req, res) => {
    const {data, error} = await supabase
    .from('galleries')
    .select()
    .ilike('galleryCountry', `${req.params.substring}%`);
    res.send(data);
});

/* =========== ARTISTS API =========== */
app.get('/api/artists', async (req, res) => {
    const {data, error} = await supabase
    .from('artists')
    .select();
    res.send(data);
});

/* =========== PAINTINGS API =========== */
app.get('/api/paintings', async (req, res) => {
    const {data, error} = await supabase
    .from('paintings')
    .select();
    res.send(data);
});

app.get('/api/artists/:ref', async (req, res) => {
    const {data, error} = await supabase
    .from('artists')
    .select()
    .eq('artistId', req.params.ref);
    res.send(data);
});

app.get('/api/artists/search/:substring', async (req, res) => {
    const {data, error} = await supabase
    .from('artists')
    .select()
    .ilike('lastName', `${req.params.substring}%`);
    res.send(data);
});

app.get('/api/artists/country/:substring', async (req, res) => {
    const {data, error} = await supabase
    .from('artists')
    .select()
    .ilike('nationality', `${req.params.substring}%`);
    res.send(data);
});

/* =========== GENRES API =========== */
app.get('/api/genres', async (req, res) => {
    const {data, error} = await supabase
    .from('genres')
    .select();
    res.send(data);
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