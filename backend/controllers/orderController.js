const {Recording, Medium, Artist, Genre, RecordGenre, RecordArtist, Catalog, Store, Order} = require('../models');
const {Op} = require('sequelize');

exports.getAllOrders = async (req, res) => {
    try{

        const orders = await Order.findAll();

        res.status(200).json(orders);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении заказов'});
    }
};


exports.makeOrder = async(req, res) => {
    try{
        const { orders } = req.body;

        if(!Array.isArray(orders) || orders.length===0){
            return res.status(400).json({message: 'Неверный формат данных'});
        }

        const recordingIds = [...new Set(orders.map(o => o.recordingId))];
        const recordings = await Recording.findAll({
            where: {id: recordingIds},
        });
        console.log(recordings);

        const priceMap = {}
        recordings.forEach(r => {
            priceMap[r.id] = parseFloat(r.wholesale_price);
        })
        console.log(recordings);

        const orderData = orders.map(o => {
            const uprice = priceMap[o.recordingId] || 0;
            const qty = parseInt(o.quantity);
            return {
                storeId: o.storeId,
                recordingId: o.recordingId,
                quantity: qty,
                statusId: 1,
                price: uprice * qty,
            };
        });
        console.log(orderData);

        await Order.bulkCreate(orderData);
        res.status(201).json({message: "Заказ создан"})
    } catch(err){
        console.error(err);
    }
};