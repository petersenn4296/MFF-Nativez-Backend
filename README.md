https://mffapi.herokuapp.com

API endpoints

​		Login

​			'/login'

​				returns:

```
login: owner
```

​

​	See all trucks belonging to one owner

​			`/trucks/:id`

​				:id refers to owner_id

​				returns :

```
[
    {
        "id": 2,
        "owner_id": 1,
        "name": "sarasOtherTruck",
        "img_url": "",
        "veggiefriendly": false,
        "latitude": 40.0192,
        "longitude": -105.279
    },
    {
        "id": 1,
        "owner_id": 1,
        "name": "sarasTruck",
        "img_url": "",
        "veggiefriendly": true,
        "latitude": 40.0164,
        "longitude": -105.282
    }
]
```

​	Truck

​		See one truck

​			`/trucks/truck/:id`

​				:id refers to truck_id

​				returns:

```
[
    {
        "id": 1,
        "owner_id": 1,
        "name": "sarasTruck",
        "img_url": "",
        "veggiefriendly": true,
        "latitude": 40.0164,
        "longitude": -105.282
    }
]
```

​		See orders from one truck

​			`/orders/order/:id`

​				:id refers to order_id

​				returns:

```
[
    {
        "id": 2,
        "truck_id": 2,
        "eater_id": 2
    }
]
```

​		See items from one truck

​			`/items/:id`

​				:id refers to truck_id

​				returns:

```
[
    {
        "id": 2,
        "truck_id": 2,
        "price": 8,
        "name": "burger"
    }
]
```

POST requests

/users

```
    {
        username: "",
        email: "",
        tel: "",
        password: "",
        isOwner: true || false
    }
```

/trucks

```
    {
        owner_id: "",
        name: "",
        img_url: "",
        veggiefriendly: "",
        latitude: "",
        longitude: ""
    }
```

/items

```
    {
        truck_id: "",
        price: "",
        name: ""
    }
```

/orders

```
    {
        truck_id: "",
        eater_id: ""
    }
```

/order_items

```
    {
        order_id: "",
        item_id: ""
    }
```
