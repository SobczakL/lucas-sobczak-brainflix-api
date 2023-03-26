# **OVERVIEW**

The URL for the API is: http://localhost:8080/

---
## **ROUTES**
---
### **GET** /videos
 - Returns an array of videos.
Response body example:
``` javascript [
    {
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "title": "BMX Rampage: 2021 Highlights",
        "channel": "Red Cow",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": "This is a description",
        "views": "1,001,023",
        "likes": "110,985",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": 1626032763000,
        "comments": [
            {
                "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                "name": "Micheal Lyons",
                "comment": "This is a comment.",
                "likes": 0,
                "timestamp": 1628522461000
            }
        ]
    }
```
---
### **POST** /videos
- Creates a new video object.
- Will return a 400 error code if 'title, 'channel', 'description', and 'timestamp are not provided in request.
- If successful, a response will return the videos array with the new video appended.

Required Request Headers: Content-Type: application/json

POST Body Example:
```javascript
{
    "title": "Video Title",
    "channel": "My Channel Name",
    "description": "This is a description.",
    "timestamp": "1626032763000",
}
```

Response Body Example:
```javascript
{
    {
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "title": "Video Title",
        "channel": "My Channel Name",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": "This is a description",
        "views": "0",
        "likes": "0",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": 1626032763000,
        "comments": []
    }
}
```
---
### **POST** /comments
- Creates a new comment
- Will return a 400 error code if 'name' and 'comment' are not included.

Required Request Headers: Content-Type: application/json

POST Body Example:
```javascript
{
    "name": "Bill",
    "comment": "First comment"
}
```

Response Body Example:
```javascript
{
    {
        "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
        "name": "Bill",
        "comment": "First comment",
        "likes": 0,
        "timestamp": 1626011132000
    }
}
```
---
### **DELETE** /comments/:id
- Deletes the comment identified by :id.
    - Swap :id for the if of the element you want to delete.
- if successful, it will return an array of comments without comment that was just deleted.

Response Body Example 
```javascript
[
    {
        "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        "name": "Micheal Lyons",
        "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        "likes": 0,
        "timestamp": 1628522461000
    },
    {
        "id": "091de676-61af-4ee6-90de-3a7a53af7521",
        "name": "Gary Wong",
        "comment": "Every time I see him shred I feel so motivated to get off my coucand hop on my board. He’s so talented! I wish I can ride like him one day so can really enjoy myself!",
        "likes": 0,
        "timestamp": 1626359541000
    }
]
```
---
## **DEPLOYMENT**
- Initialize server using with NPM START
- It will return a message detailing that, 'Server is running on port: 8080'