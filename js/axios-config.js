
(function(){
	var CancelToken = window.axios.CancelToken;
	window.cancelApi = null;
	var ERR_OK = 0;
	var LOGIN_TIME_OUT = 99;
	var INFO_EMPTY = 4;
	var CANCEL = -99;

	var Axios = window.axios.create({
		baseURL: 'http://api.linkwey.net/index.php/WXAPI/', // 反向代理
		timeout: 20000,
		responseType: 'json',
		withCredentials: true, // 是否允许带cookie这些
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		}

	});



	//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN


	Axios.interceptors.request.use(
		function(config) {

      // if (getCookie("token")) {
			//
			//    config.data.token = getCookie("token");
			//
			//  }

			config.cancelToken = new CancelToken(function executor(c) {
				// executor 函数接收一个 cancel 函数作为参数
				window.cancelApi = c;
			});

			// 在发送请求之前做某件事
			if (
				config.method === 'post' ||
				config.method === 'put' ||
				config.method === 'delete'``
			) {
				// 序列化
				if (config.headers['Content-Type'] !== 'multipart/form-data') {
					var data = '';
					if(config.data && config.data!=={}){
						for(var key in config.data){
							data += encodeURIComponent(key) + '=' + encodeURIComponent(config.data[key]) + '&';
						}
						config.data = data.substr(0,data.length-1);
					}else{
						config.data = '';
					}
				}
			}
			// 若是有做鉴权token , 就给头部带上token


			return config;
		},
		function(error){
			console.log(error)
			return Promise.reject(error.data.error.message);
		}
	);

	// 返回状态判断(添加响应拦截器)
	Axios.interceptors.response.use(

		function(res){

			// 对响应数据做些事
			if (res.data) {
				//return Promise.reject(res.data);
			}

			return res.data;
		},
		function(error){

			if(error.message == CANCEL){
				return Promise.reject();
			}

			return Promise.reject(error);
		}
	);

	window.Axios = Axios;
	window.Url = {
		// ------------登录注册-------------
        //登录
        login: 'User/login',
        // 退出登陆
        logout: 'User/logout',
        //短信验证码
        code: 'User/send_code',
				// 密码登录
				loginPws: 'User/login_pws',
				// 忘记密码
				forget:'User/forget',
				// 注册
				register: 'User/register',
				// 协议
				agreement: 'User/agreement',

				// ------------认证-------------
				// 主营类目
				theMainCategories: 'Shop/the_main_categories',
				// 供应商认证
				supplierApply: 'User/supplierApply',
				// 供应商/服务商 认证详情页
				applyInfo: 'User/applyInfo',
				// 服务商认证
				serviceApply: 'User/serviceApply',
				// 服务商公司类型
				seviceType: 'User/seviceType',
				// 审核页面
				verifyDetail: 'User/verifyDetail',
				// 创建店铺
				createShop: 'Shop/create_shop',

        // ------------首页-------------
				// 首页显示
        main: 'Index/main',
        // 猜你喜欢
        guessGoods: 'Index/guessGoods',
        // 精彩直播
        recommendLive: 'Index/recommend_live',
        // 店铺材料
        storeMaterials: 'Index/store_materials',
        // 每日上新
        dailyUpdate: 'Index/daily_update',
				// 每日上新轮播
				dailyUpdate1: 'Index/daily_update1',
        //买手专区
        buyers_area: 'Index/buyers_area',
        //买手专区 商品
        buyer_area_goods: 'Index/buyer_area_goods',
        //订货专区
        order_area: 'Index/order_area',
        //爆款热卖
        boom_sale: 'Index/boom_sale',
        //促销礼品
        promotion: 'Index/promotional_gifts',
				// 四大板块轮播图
				getBanner: 'Index/get_banner',

        //精选专场
        special: 'Index/special_selection',
        //公告信息
        notice: 'Index/notice',
				//首页分类页面
				homePageSwitching:'Index/home_page_switching',
				//banner内页活动
				indexBanner:'Index/banner',
        // ------------分类-------------
        //商品分类
        categoryList: 'Goods/categoryList',
        //二级分类
        nextCategoryList: 'Goods/nextCategoryList',
        // ------------商品列表-----------
        goodsList: 'Goods/goodsList',
        //-------------商品详情-----------
        goodsInfo: 'Goods/goodsInfo',
        //收藏取消商品
        collectGoods: 'Goods/collectGoods',
        //商品评论
        getGoodsComment: 'Goods/getGoodsComment',
        // -------------店铺-------------
        //店铺详情
        storeAbout: 'Store/about',
        //店铺商品
        storeShop: 'Store/goods_list',
        //店铺列表
        street: 'Index/street',
        //收藏取消店铺
        collectStore: 'Goods/collectStore',
        //店铺收藏列表
        storeCollect: 'User/store_collect',
        //------------逛一逛-------------
        //逛一逛banner图
        boamBanner: 'Roam/banner',
        //逛一逛列表
        roamList: 'Roam/roamList',


        // ------------个人中心-------------
        // 支付
        payOrder: 'Cart/payOrder',
        // 我的中心
        userIndex: 'User/index',
				// 修改头像或者昵称
				editUser: 'User/editUser',
        // 全部订单
        allOrders: 'User/all_orders',
        // 获取用户待付款订单
        substitutePayment: 'User/substitute_payment',
        // 获取用户待发货订单
        substituteShipment: 'User/substitute_shipment',
        // 获取用户待收货订单
        substituteWaitreceve: 'User/substitute_waitreceve',
        // 获取用户待评价订单
        substituteWaitccomment: 'User/substitute_waitccomment',
				// 获取订单列表（统一用这个）
				orderList: 'User/order_list',
        // 取消订单
        cancelOrder: 'User/cancel_order',

        // 获取退换货列表
        returnGoodsLists: 'User/return_goods_lists',
        // 获取退换货详情
        returnGoodsInfos: 'User/return_goods_infos',
        // 获取退换货详情
        delReturn: 'User/del_return',
        // 退换货信息
        returnDetail: 'User/return_detail',
        // 申请修改操作
        editReturn: 'User/edit_return',
				// 提交物流信息
				submmitShipping: 'User/submmit_shipping',
				// 申请平台介入
				serviceIn: 'User/service_in',

        // 订单详情
        orderDetails: 'User/order_details',
        // 获取订单待评价列表
        commentLists: 'User/comment_lists',
        // 添加评论
        conmment_adds: 'User/conmment_adds',
        // 上传图片
        uploadMore: 'User/uploadMore',

        // 获取物流信息
        userOrderLogs: 'User/user_order_logs',
        //退款申请列表
        userOrderServices: 'User/user_order_services',
        // 退款申请
        user_order_services1: 'User/user_order_services1',

        // 确认收货
        orderConfirm: 'User/order_confirm',


        // 商品收藏
        collectList: 'User/collect_list',
        // 取消商品收藏
        delGoodsCollect: 'User/delGoodsCollect',
        // 加入购物车
        addCart: 'Cart/addCart',

        // 店铺收藏
        storeCollect: 'User/store_collect',
        // 取消店铺收藏
        delStoreCollect: 'User/delStoreCollect',
        // 帮助中心
        helpCenter: 'User/helpCenter',
        // 帮助中心下一级列表
        helpCat: 'User/helpCat',
        // 帮助中心文章内容
        articleDetail: 'User/articleDetail',
        // 发票列表
        invoice: 'User/invoice',
        // 编辑发票
        editInvoice: 'User/editInvoice',
        // 添加发票
        addInvoice: 'User/addInvoice',
        // 删除发票
        delInvoice: 'User/delInvoice',
        // 我的钱包
        mywallet: 'User/mywallet',

        // 收货地址列表
        addressList: 'User/addressList',
        // 添加地址
        addAddress: 'User/add_address',
        // 修改地址
        editAddress: 'User/edit_address',
        // 删除地址
        delAddress: 'User/del_address',
        // 设置是否为默认地址
        setAddress: 'User/set_address',
				// 我的设置
				mySettings: 'User/my_settings',
				// 站内信列表
				messageList: 'Shop/message_list',
				// 站内信全部已读
				whole: 'Shop/whole',
				// 站内信内容
				messageContent: 'Shop/message_content',
				// 站内信内容
				messageDel: 'Shop/message_del',


        //------------直播-------------
        // 直播列表
        liveBroadcast: 'Live/live_broadcast',
        // 精彩回放列表
        history: 'Live/history',
        // 直播间数据
        liveBroadcastInner: 'Live/live_broadcast_inner',
        // 直播间商品列表
        liveGoods: 'Live/live_goods',
        // 收藏或取消收藏店铺
        collectStore: 'Goods/collectStore',
        // 直播点赞
        pointLive: 'Live/point_live',
        // 直播评论
        commentLive: 'Live/comment_live',
        // 直播评论列表
        comment: 'Live/comment',
				// 商家直播记录
				shopHistory: 'Live/shop_history',
				// 服务商分享接口
				shareUrl: 'Live/shareUrl',
				// 举报类型
				report: 'Live/report',
				// 处理直播举报
				dealReport: 'Live/dealReport',


        //------------购物车-------------
        //加入购物车
        addCart: 'Cart/addCart',
        // 获取购物车列表
        cartList: 'Cart/cartList',
        // 购物车修改商品数量
        updateNum: 'Cart/updateNum',
        // 购物车修改选中
        updateSelect: 'Cart/updateSelect',
        // 批量删除购物车
        delCart: 'Cart/delCart',
        // 购物车全选或全不选
        updateAllSelect: 'Cart/updateAllSelect',
        // 购物车修改选中
        updateSelect: 'Cart/updateSelect',
        // 核对订单信息
        cart2: 'Cart/cart2',
        // 获取订单最终价格（使用优惠券或者积分）或者提交订单
        cart3: 'Cart/cart3',

				// 直接购买（存储）
				directBuy: 'Cart/direct_buy',
				// 核对直接购买
				checkBuy: 'Cart/check_buy',
				// 直接购买提交
				dealBuy: 'Cart/deal_buy',

				// 购物车报表
				analysis: 'Cart/analysis',




        //---------------供应商首页------------------
				// 订单列表
					satOrder:'Shop/order_management',
				//订单详情
					shopOrderDetail:'Shop/orderDetail',
				//退款中心
					orderReturn:'Shop/order_return',
				//退款详情
					orderReturnDetail:'Shop/order_return_detail',
				//发货
					deliverGoods:'Shop/delivery',
				//店铺资产
					shopAssets:'Shop/shop_assets',
				//退货操作
					returnHandle:'Shop/return_handle',
				//数据统计
					revenueStatistics:'Shop/revenue_statistics',
				//商品管理
					shangMmanagement:'Shop/shang_management',
				//上架下架
					ShopSaleGoods:'Shop/saleGoods',
				//删除商品
					shopDelGoods:'Shop/delGoods',
				//店铺管理
					storeManagement:'Shop/store_management',
				//店铺信息保存
					storeInforonSave:'Shop/store_inforon_save',
				//店铺地址
					dressInsidePage:'Shop/dress_inside_page',
				//修改商家地址
					dressInsidePageSave:'Shop/dress_inside_page_save',
				//企业认证
					nterpriseCertification:'Shop/nterprise_certification',
				//评价管理
					evaluationManagement:'Shop/evaluation_management',
				//待评价（买家未评）
					notEvaluated:'Shop/not_evaluated',
				//待评价（买家已评）
					alreadyEvaluated:'Shop/already_evaluated',
				//卖家的评价
					sellerEvaluation:'Shop/seller_evaluation',
				//好评
					goodPraise:'Shop/Praise',
				//差评与中评
					negativeComment:'Shop/negative_comment',
				//首页
					ShopIndex:'Shop/index',
				//交易统计
					transactionStatistics:'Shop/transaction_statistics',
				//每日交易统计
				dailyTradingStatistics:'Shop/daily_trading_statistics',
				//修改地址列表
				modifyUserAddress:'Shop/modify_user_address',
				//修改地址
				modifyUserAddressSave:'Shop/modify_user_address_save',
				//物流信息
				logisticsExpress:'Shop/express',
				//修改商品列表
				addMerchandise:'Shop/add_merchandise',
				//上架出售与放入仓库
				addEditGoods:'Shop/addEditGoods',
				//获取对应的2、3级分类
				obtainingClassification:'Shop/obtaining_Classification',
				//获取商品规格
				ajaxGetSpecSelect:'Shop/ajaxGetSpecSelect',
				//卖家评论回复
				recoveryEvaluationSave:'Shop/recovery_evaluation_save',
				//交易记录
				transactionRecord:'Shop/transaction_record',


        //---------------供应商直播------------------
				// 供应商直播记录
        liveHistory: 'Live/live_history',
        // 删除供应商直播历史
        delLive: 'Live/del_live',
        // 供应商店铺主分类
        category: 'Live/category',
        // 供应商店铺分类下商品
        categoryGoods: 'Live/categoryGoods',
        // 添加直播
        addLive: 'Live/add_live',
				// 查询是否开通房间
				isApply: 'Live/is_apply',
				// 申请开通直播房间
				applyLive: 'Live/applyLive',
				// 修改申请房间
				editApply: 'Live/edit_apply',
				// 关闭直播
				liveOver: 'Live/liveOver',

        //---------------供应商我的------------------
        // 个人资料
        user4: 'Shop/user_4',
				// 链合汇介绍
				introductionConvergence: 'Shop/Introduction_Convergence',
				// 商家学堂
				user1: 'Shop/user_1',
				// 保存用户头像和昵称
				userSave: 'Shop/user_4_save',

				//商家a-z
				indexStreeList:'/Index/streeList',
				// 分类下店铺列表
				goodShopList:'/Goods/shopList',
				// 搜索分类店铺列表
				goodSearchStoreList:'/Goods/searchStoreList',

	}
})();
