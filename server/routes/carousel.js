const express = require('express');
const router = express.Router();
const connection = require('../db/sql.js'); // 数据库连接

// 获取所有轮播图
router.get('/getCarousels', (req, res) => {
  connection.query('SELECT * FROM carousel', (error, results) => {
    if (error) {
      return res.status(500).send({ success: "1", msg: "服务器错误" });
    }
    res.send({ success: "0", data: results });
  });
});

// 添加轮播图
router.post('/addCarousel', (req, res) => {
  const { images } = req.body;
  connection.query('INSERT INTO carousel (images) VALUES (?)', [images], (error) => {
    if (error) {
      return res.status(500).send({ success: "1", msg: "添加失败" });
    }
    res.send({ success: "0", msg: "添加成功" });
  });
});

// 删除轮播图
router.delete('/deleteCarousel', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM carousel WHERE id = ?', [id], (error) => {
    if (error) {
      return res.status(500).send({ success: "1", msg: "删除失败" });
    }
    res.send({ success: "0", msg: "删除成功" });
  });
});

// 更新轮播图
router.put('/updateCarousel', (req, res) => {
  const { id, images } = req.body;
  connection.query('UPDATE carousel SET images = ? WHERE id = ?', [images, id], (error) => {
    if (error) {
      return res.status(500).send({ success: "1", msg: "更新失败" });
    }
    res.send({ success: "0", msg: "更新成功" });
  });
});

module.exports = router;
