/**
 * 封装常用的uni API
 */

/**
 * 请求
 * @param {String} url   请求地址   必填
 * @param {Object} data   请求数据  
 * @param {String} method 请求方式  
 */
export const request = ({
	url,
	data,
	method
}) => {

	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method ? method : 'GET',
			data: data,
			success(resp) {
				resolve(resp);
			},
			fail(error) {
				reject(error);
			},
			complete() {

			}
		})
	})
}

/**
 * @param {String} provider   值 weixin 
 */
export const login = (provider) => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: provider,
			success(resp) {
				resolve(resp);
			},
			fail(error) {
				reject(error);
			}
		})
	})
}
/** 
 * 上传本地图片
 * @param {Number}  count
 * @param {Array<String>}  sizeType
 * @param {Array<String>}  sourceType  
 */
export const chooseImg = ({
	count,
	sizeType,
	sourceType
}) => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count ? count : 9,
			sizeType: sizeType ? sizeType : ['original', 'compressed'],
			sourceType: sourceType ? sourceType : ['album', 'camera'],
			success(resp) {
				resolve(resp);
			},
			fail(error) {
				reject(error);
			}
		});
	})
}
/**
 * 获取图片信息
 * @param {String} src 必填  
 * 
 */
export const getImageInfo = ({
	src
}) => {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: src,
			success: function(image) {
				resolve(image);
			},
			fail(error) {
				reject(error);
			}
		});
	})
}
/**
 * 保存图片
 * @param {String} url  必填    要保存的图片路径  
 */

export const saveImageToPhotosAlbum = ({
	url
}) => {
	return new Promise((resolve, reject) => {
		uni.saveImageToPhotosAlbum({
			filePath: url,
			success: function() {
				resolve(1);
			},
			fail(error) {
				reject(error);
			}
		});
	})
}

/**
 * 信息
 */
export const showToast = (title, icon = 'none') => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: title,
			icon: icon
		})
	})
}

/**
 * 获取系统信息
 */
export const getSystemInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getSystemInfo({
			success(resp) {
				resolve(resp)
			},
			fail(error) {
				reject(error)
			}
		});
	})
}


/**
 * 获取页面内容高度
 */
export const getQueryHeight = (id) => {
	return new Promise((resolve, reject) => {
		var query = uni.createSelectorQuery();
		query
			.select('#' + id)
			.boundingClientRect(function(rect) {
				resolve(rect)
			})
			.exec();
	})
}
