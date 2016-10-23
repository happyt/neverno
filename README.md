## neverno server

A simple server to strip some data from the neverno feed

- Reads a neverno feed
- converts to object with only a few items
    - `full_name`
    - `nickname`
    - `profile_image`
    - `message`
- save original feed to JSON file
- save items to JSON file
- serves the JSON files through express
- uses CORS enable
- presents a simplified set of data for the lower third client

