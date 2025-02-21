# COMP_4513_Assign1

## Overview
- This repository holds the JavaScript code for Assignment #1 of COMP 4513 at Mount Royal University. The goal of this project was to 
create a series of web accessible APIs using Node, Express and SQLite to interact with a database containing artists, paintings and galleries data.

## Built Using
![Node.js](https://img.shields.io/badge/Node.js-22.12.0-red)
![Express](https://img.shields.io/badge/Express-4.21.2-orange)
![SQLite3](https://img.shields.io/badge/SQLite3-5.1.7-yellow)
![Supabase-js](https://img.shields.io/badge/Supabase.js-2.48.1-green)
![Render](https://img.shields.io/badge/Deployed%20on-Render.com-blue)

## API Endpoints
| API Endpoint | Description |
|-------------|-------------|
| `/api/eras` | Returns all the eras |
| `/api/galleries` | Returns all the galleries |
| `/api/galleries/:id` | Returns a specific gallery by ID (e.g., `/api/galleries/30`) |
| `/api/galleries/country/:substring` | Returns galleries where the country name starts with the given substring (e.g., `/api/galleries/country/fra`) |
| `/api/artists` | Returns all artists |
| `/api/artists/:id` | Returns a specific artist by ID (e.g., `/api/artists/12`) |
| `/api/artists/search/:substring` | Returns artists whose last name starts with the given substring (e.g., `/api/artists/search/ma`) |
| `/api/artists/country/:substring` | Returns artists whose nationality starts with the given substring (e.g., `/api/artists/country/fra`) |
| `/api/paintings` | Returns all paintings |
| `/api/paintings/sort/:field` | Returns all paintings sorted by title or yearOfWork (e.g., `/api/paintings/sort/year`) |
| `/api/paintings/:id` | Returns a specific painting by ID (e.g., `/api/paintings/63`) |
| `/api/paintings/search/:substring` | Returns paintings whose title contains the given substring (e.g., `/api/paintings/search/port`) |
| `/api/paintings/years/:start/:end` | Returns paintings between two years, sorted by yearOfWork (e.g., `/api/paintings/years/1800/1850`) |
| `/api/paintings/galleries/:id` | Returns all paintings in a given gallery by ID (e.g., `/api/paintings/galleries/5`) |
| `/api/paintings/artist/:id` | Returns all paintings by a given artist by ID (e.g., `/api/paintings/artist/16`) |
| `/api/paintings/artist/country/:substring` | Returns all paintings by artists whose nationality starts with the given substring (e.g., `/api/paintings/artist/country/ital`) |
| `/api/genres` | Returns all genres |
| `/api/genres/:id` | Returns a specific genre by ID (e.g., `/api/genres/76`) |
| `/api/genres/painting/:id` | Returns the genres used in a given painting, ordered by genre name (e.g., `/api/genres/painting/408`) |
| `/api/paintings/genre/:id` | Returns all paintings for a given genre by ID, sorted by yearOfWork (e.g., `/api/paintings/genre/78`) |
| `/api/paintings/era/:id` | Returns all paintings for a given era by ID, sorted by yearOfWork (e.g., `/api/paintings/era/2`) |
| `/api/counts/genres` | Returns genre names and the number of paintings for each genre, sorted by count (fewest to most) |
| `/api/counts/artists` | Returns artist names and the number of paintings for each artist, sorted by count (most to fewest) |
| `/api/counts/topgenres/:threshold` | Returns genres with more than a specified number of paintings, sorted from most to least (e.g., `/api/counts/topgenres/20`) |


## Test Links
- [/api/eras](https://comp4513-assign1.onrender.com/api/eras)
- [/api/galleries](https://comp4513-assign1.onrender.com/api/galleries)
- [/api/galleries/30](https://comp4513-assign1.onrender.com/api/galleries/30)
- [/api/galleries/Calgary](https://comp4513-assign1.onrender.com/api/galleries/Calgary)
- [/api/galleries/country/fra](https://comp4513-assign1.onrender.com/api/galleries/country/fra)
- [/api/artists](https://comp4513-assign1.onrender.com/api/artists)
- [/api/artists/12](https://comp4513-assign1.onrender.com/api/artists/12)
- [/api/artists/1223423](https://comp4513-assign1.onrender.com/api/artists/1223423)
- [/api/artists/search/ma](https://comp4513-assign1.onrender.com/api/artists/search/ma)
- [/api/artists/search/mA](https://comp4513-assign1.onrender.com/api/artists/search/mA)
- [/api/artists/country/fra](https://comp4513-assign1.onrender.com/api/artists/country/fra)
- [/api/paintings](https://comp4513-assign1.onrender.com/api/paintings)
- [/api/paintings/sort/year](https://comp4513-assign1.onrender.com/api/paintings/sort/year)
- [/api/paintings/63](https://comp4513-assign1.onrender.com/api/paintings/63)
- [/api/paintings/search/port](https://comp4513-assign1.onrender.com/api/paintings/search/port)
- [/api/paintings/search/pORt](https://comp4513-assign1.onrender.com/api/paintings/search/pORt)
- [/api/paintings/search/connolly](https://comp4513-assign1.onrender.com/api/paintings/search/connolly)
- [/api/paintings/years/1800/1850](https://comp4513-assign1.onrender.com/api/paintings/years/1800/1850)
- [/api/paintings/galleries/5](https://comp4513-assign1.onrender.com/api/paintings/galleries/5)
- [/api/paintings/artist/16](https://comp4513-assign1.onrender.com/api/paintings/artist/16)
- [/api/paintings/artist/666](https://comp4513-assign1.onrender.com/api/paintings/artist/666)
- [/api/paintings/artist/country/ital](https://comp4513-assign1.onrender.com/api/paintings/artist/country/ital)
- [/api/genres](https://comp4513-assign1.onrender.com/api/genres)
- [/api/genres/76](https://comp4513-assign1.onrender.com/api/genres/76)
- [/api/genres/painting/408](https://comp4513-assign1.onrender.com/api/genres/painting/408)
- [/api/genres/painting/jsdfhg](https://comp4513-assign1.onrender.com/api/genres/painting/jsdfhg)
- [/api/paintings/genre/78](https://comp4513-assign1.onrender.com/api/paintings/genre/78)
- [/api/paintings/era/2](https://comp4513-assign1.onrender.com/api/paintings/era/2)
- [/api/counts/genres](https://comp4513-assign1.onrender.com/api/counts/genres)
- [/api/counts/artists](https://comp4513-assign1.onrender.com/api/counts/artists)
- [/api/counts/topgenres/20](https://comp4513-assign1.onrender.com/api/counts/topgenres/20)
- [/api/counts/topgenres/2034958](https://comp4513-assign1.onrender.com/api/counts/topgenres/2034958)
