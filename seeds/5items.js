exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('items').insert([
        {truck_id: '1', price: '4', name: 'Vailla Ice Cream Cone'},
        {truck_id: '1', price: '6', name: 'Fudge Sundae'},
        {truck_id: '1', price: '5', name: 'Banana Split'},
        {truck_id: '1', price: '5', name: 'Milkshake'},
        {truck_id: '2', price: '3', name: 'Beef Taco'},
        {truck_id: '2', price: '3', name: 'Chicken Taco'},
        {truck_id: '2', price: '3', name: 'Pork Taco'},
        {truck_id: '2', price: '3', name: 'Tripe Taco'},
        {truck_id: '2', price: '3', name: 'Mole Taco'},
        {truck_id: '2', price: '3', name: 'Bacon Taco'},
        {truck_id: '3', price: '6', name: 'Pabellon Arepa'},
        {truck_id: '3', price: '6', name: 'Mix Arepa'},
        {truck_id: '3', price: '6', name: 'Chicken Arepa'},
        {truck_id: '3', price: '6', name: 'Queen Arepa'},
        {truck_id: '3', price: '6', name: 'Veggie Arepa'},
        {truck_id: '3', price: '6', name: 'Domino Arepa'},
        {truck_id: '3', price: '6', name: 'Molida Arepa'},
        {truck_id: '4', price: '9', name: 'Formaggio'},
        {truck_id: '4', price: '10', name: 'Pepperoni'},
        {truck_id: '4', price: '10', name: 'Sausage'},
        {truck_id: '4', price: '10', name: 'Mahrgerita'},
        {truck_id: '4', price: '10', name: 'Fresca'},
        {truck_id: '4', price: '12', name: 'Hawaii Five 0'},
        {truck_id: '5', price: '9', name: 'Quinoa Bowl'},
        {truck_id: '5', price: '12', name: 'Blackened Fish Tacos'},
        {truck_id: '5', price: '10', name: 'Reuben Sandwich'},
        {truck_id: '5', price: '9', name: 'Cheesesteak Sandwich'},
        {truck_id: '5', price: '8', name: 'Buffalo Chciken Wrap'},
        {truck_id: '5', price: '8', name: 'Veggia Quesdailla'}
      ])
    .then(() => {
      return knex.raw("SELECT setval('items_id_seq', (SELECT MAX(id) FROM items))")
    });
};
