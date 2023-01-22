const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketItem = sequelize.define('basket_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    article: {type: DataTypes.STRING, allowNull: false},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    old_price: {type: DataTypes.STRING, allowNull: false},
    discount: {type: DataTypes.STRING, allowNull: false},
    discount_flag: {type: DataTypes.BOOLEAN, allowNull: false},
    article: {type: DataTypes.STRING, unique: true, allowNull: false},
    length: {type: DataTypes.STRING, allowNull: false},
    width: {type: DataTypes.STRING, allowNull: false},
    height: {type: DataTypes.STRING, allowNull: false},
    weight: {type: DataTypes.STRING, allowNull: false},
    count_shop: {type: DataTypes.STRING, allowNull: false},
    new_item: {type: DataTypes.BOOLEAN, allowNull: false},
    availability: {type: DataTypes.BOOLEAN, allowNull: false},
    visibility: {type: DataTypes.BOOLEAN, allowNull: false}
})

const ItemTag = sequelize.define('item_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ItemColor = sequelize.define('item_color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img1: {type: DataTypes.STRING, allowNull: false},
    img2: {type: DataTypes.STRING, allowNull: false},
    img3: {type: DataTypes.STRING, allowNull: false},
    img4: {type: DataTypes.STRING, allowNull: false}
})

const ItemInfo = sequelize.define('item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.TEXT, allowNull: false}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false},
    number: {type: DataTypes.STRING, unique: true, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    secondName: {type: DataTypes.STRING, allowNull: false},
    phoneNumber: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    index: {type: DataTypes.STRING, allowNull: false},
    street: {type: DataTypes.STRING, allowNull: false},
    house: {type: DataTypes.STRING, allowNull: false},
    flat: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    track: {type: DataTypes.STRING, allowNull: false},
    typePay: {type: DataTypes.STRING, allowNull: false},
    typeDelivery: {type: DataTypes.STRING, allowNull: false},
    typeSubmit: {type: DataTypes.STRING, allowNull: false}
})

const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
    article: {type: DataTypes.STRING, allowNull: false},
})

const RepairRequest = sequelize.define('repair_request', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.STRING, allowNull: true},
    response: {type: DataTypes.BOOLEAN, allowNull: false},
})

const Dialog = sequelize.define('dialog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    lastMessage: {type: DataTypes.STRING, allowNull: false},
    lastAdminCheck: {type: DataTypes.STRING, allowNull: false},
})

const Request = sequelize.define('request', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    checked: {type: DataTypes.BOOLEAN, allowNull: false}
})

const Tag_to_Item = sequelize.define('tag_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

Item.hasMany(OrderItem)
OrderItem.belongsTo(Item)

Item.hasMany(ItemInfo)
ItemInfo.belongsTo(Item)

Item.hasMany(ItemColor)
ItemColor.belongsTo(Item)

ItemColor.hasMany(BasketItem)
BasketItem.belongsTo(ItemColor)

ItemTag.belongsToMany(Item, {through: Tag_to_Item})
Item.belongsToMany(ItemTag, {through: Tag_to_Item})

module.exports = {
    User,
    Basket,
    BasketItem,
    Item,
    Order,
    OrderItem,
    ItemInfo,
    ItemColor,
    RepairRequest,
    Dialog,
    ItemTag,
    Request,
    Tag_to_Item
}