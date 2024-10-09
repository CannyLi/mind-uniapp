<template>
	  <view class="article-container">
	    <view class="article-header">
	      <text class="article-title"></text>
	    </view>
	    <view class="article-meta">
	      <text>发布日期：</text>
	      <text>作者：</text>
	    </view>
	    <view class="article-content">
	      <text>文章内容</text>
	    </view>
		<view class="article-actions">
			<text>点赞</text>
			<text>收藏</text>
		</view>
	  </view>
</template>

<script>
</script>

<style scoped>
.article-container {
  padding: 20px;
}
.article-header {
  margin-bottom: 10px;
}
.article-title {
  font-size: 24px;
  font-weight: bold;
}
.article-meta {
  color: #666;
  margin-bottom: 10px;
}
.article-content {
  margin-top: 10px;
}
</style>