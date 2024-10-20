const express = require('express');
const router = express.Router();
const connection = require('../db/sql.js'); // 数据库连接

// 获取医生列表
router.get('/doctors', (req, res) => {
    connection.query('SELECT * FROM doctors', (err, results) => {
        if (err) {
            return res.status(500).json({ success: "1", message: "获取医生失败" });
        }
        res.json({
            success: "0",
            data: results
        });
    });
});

// 获取单个医生信息
router.get('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    connection.query('SELECT * FROM doctors WHERE doctor_id = ?', [doctorId], (err, results) => {
        if (err) {
            console.error(err); // 输出错误信息到控制台
            return res.status(500).json({ success: "1", message: "获取医生信息失败" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: "1", message: "医生未找到" });
        }
        res.json({ success: "0", data: results[0] });
    });
});


// 创建医生
router.post('/doctors', (req, res) => {
    const { name, doctor_image, introduction, expertise, consultation_notice } = req.body;
    connection.query(
        'INSERT INTO doctors (name, doctor_image, introduction, expertise, consultation_notice) VALUES (?, ?, ?, ?, ?)',
        [name, doctor_image, introduction, expertise, consultation_notice],
        (err, results) => {
            if (err) {
                return res.status(500).json({ success: "1", message: "创建医生失败" });
            }
            res.json({ success: "0", message: "医生创建成功", doctor_id: results.insertId });
        }
    );
});

// 更新医生信息
router.put('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    const { name, doctor_image, introduction, expertise, consultation_notice } = req.body;
    connection.query(
        'UPDATE doctors SET name = ?, doctor_image = ?, introduction = ?, expertise = ?, consultation_notice = ? WHERE doctor_id = ?',
        [name, doctor_image, introduction, expertise, consultation_notice, doctorId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ success: "1", message: "更新医生失败" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ success: "1", message: "医生未找到" });
            }
            res.json({ success: "0", message: "医生更新成功" });
        }
    );
});

// 删除医生
router.delete('/doctors/:id', (req, res) => {
    const doctorId = req.params.id;
    connection.query(
        'DELETE FROM doctors WHERE doctor_id = ?',
        [doctorId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ success: "1", message: "删除医生失败" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ success: "1", message: "医生未找到" });
            }
            res.json({ success: "0", message: "医生删除成功" });
        }
    );
});

module.exports = router;
