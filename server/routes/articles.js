const express = require('express');
const router = express.Router();
const connection = require('../db/sql.js'); // 数据库连接

// 获取所有文章
router.get('/articles', (req, res) => {
    connection.query('SELECT * FROM articles', (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, msg: '数据库查询错误' });
        }
        res.json({ success: true, data: results });
    });
});

// 获取单篇文章的接口
router.get('/articles/:id', (req, res) => {
	const articleId = req.params.id;
	connection.query('SELECT * FROM articles WHERE article_id = ?', [articleId], (error, results) => {
		if (error) {
			return res.status(500).send({ success: false, msg: '服务器错误' });
		}
		if (results.length > 0) {
			res.send({ success: true, data: results[0] });
		} else {
			res.send({ success: false, msg: '文章未找到' });
		}
	});
});


// 添加文章
router.post('/articles', (req, res) => {
    const { article_image, title, publish_date, author, content, likes, favorites } = req.body;
    const sql = 'INSERT INTO articles (article_image, title, publish_date, author, content, likes, favorites) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [article_image, title, publish_date, author, content, likes, favorites], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, msg: '插入文章失败' });
        }
        res.json({ success: true, msg: '文章添加成功' });
    });
});

// 更新文章
router.put('/articles/:id', (req, res) => {
    const { id } = req.params;
    const { article_image, title, publish_date, author, content, likes, favorites } = req.body;
    const sql = 'UPDATE articles SET article_image=?, title=?, publish_date=?, author=?, content=?, likes=?, favorites=? WHERE article_id=?';
    connection.query(sql, [article_image, title, publish_date, author, content, likes, favorites, id], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, msg: '更新文章失败' });
        }
        res.json({ success: true, msg: '文章更新成功' });
    });
});

// 删除文章
router.delete('/articles/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM articles WHERE article_id=?';
    connection.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, msg: '删除文章失败' });
        }
        res.json({ success: true, msg: '文章删除成功' });
    });
});

module.exports = router;
