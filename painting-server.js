// assignment: COMP 4513 Assignment 1
// file: painting-server.js
// Express server for fetching data about eras, galleries, artists, paintings, and genres.
// Uses Supabase as the database.

const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();
require('dotenv').config();
const supaUrl = process.env.SUPABASE_URL;
const supaAnonKey = process.env.SUPABASE_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

/* =========== ROOT ROUTE API INFO =========== */
// This is a simple guide outlining the different possible routes when just /api is called
app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the COMP4513 Assignemnt 1 Art Database API",
        description: "Below are a few sample API routes examples, more can be found in the readme for this project",
        endpoints: {
            eras: "/api/eras",
            galleries: "/api/galleries",
            artists: "/api/artists",
            paintings: "/api/paintings",
            genres: "/api/genres",
            counts: {
                genres: "/api/counts/genres",
                artists: "/api/counts/artists",
                topGenres: "/api/counts/topgenres/:threshold"
            }
        }
    });
});

/* =========== ERAS API =========== */
// Get all eras
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
// Get all galleries
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

// Get a gallery by ID
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

// Get galleries from a specific country
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
// Get all artists
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

// Get an artist by ID
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

// Search artists by last name
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

// Get artists by nationality
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
            return res.status(404).json({error: `No artists found from countries starting with ${req.params.substring}.`})
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

// Get all paintings
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

// Get paintings sorted by a field (title or year)
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
            return res.status(404).json({error: `No paintings found.`})
        }

        res.send(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" }); 

    }
}); 

// Get a painting by ID
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

// Search paintings by title 
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

// Get paintings within a year range
app.get('/api/paintings/years/:start/:end', async (req, res) => {
    try {    

        if (req.params.start > req.params.end) {
            return res.status(400).json( {error: "Invalid Range: The start year must be before or equal to the end year."});
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

// Get paintings from a specific gallery
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

// Get paintings by a specific artist
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

// Get paintings by artists from a specific country
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
// Get all genres
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

// Get a genre by ID
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

// Get all genres for a painting
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

// Get paintings that belong to a specific genre
app.get('/api/paintings/genre/:id', async (req, res) => { 
    try {    
        const {data, error} = await supabase
            .from('paintinggenres')
            .select(`
                genreId,
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

// Get paintings from a specific era
app.get('/api/paintings/era/:id', async (req, res) => {
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
// Get the number of paintings per genre
app.get('/api/counts/genres', async (req, res) => {
    try {    
        const {data, error} = await supabase
            .from('genres')
            .select(`
                genreName, paintinggenres(genreId)
            `)

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `No genres found with paintings.`})
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

// Get the number of paintings per artist
app.get('/api/counts/artists', async (req, res) => { 
    try {    
        const {data, error} = await supabase
            .from('artists')
            .select(`
                firstName, lastName, paintings(paintingId)
            `);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({error: `No artists found with paintings.`})
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

// Get genres with more paintings than a given number
app.get('/api/counts/topgenres/:threshold', async (req, res) => { 
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

let port = 8070;
app.listen(port, () => {
    console.log(`API Server is running at https://comp4513-assign1.onrender.com/api`);
});