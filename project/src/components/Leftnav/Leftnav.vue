<template>
    <div class="left-nav">
        <h2><span class="iconfont">&#xe63d;</span></h2>

        <!-- 导航组件 -->
        <el-menu
        
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#333" 
            active-text-color="#fff"
            unique-opened
            router
            >

            <!-- 系统管理 -->
            <el-submenu v-for="(menu,index) in menuDate" :key="index" :index="(index +1)+''">
                <template slot="title">
                    <span class="iconfont" v-html="menu.icon_code"></span>
                    <span>{{ menu.menuTitle }}</span>
                </template>             
                <el-menu-item :index="submenu.path" v-for="(submenu,index) in menu.childern" :key="index">
                {{ submenu.subMenuTitle }}
                </el-menu-item>
            </el-submenu> 

            <!-- 账号管理 -->
            <!-- <el-submenu index="2">
                <template slot="title">
                    <span class="iconfont">&#xe60b;</span>
                    <span>账号管理</span>
                </template>             
                <el-menu-item index="/index/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/index/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/index/passwordmodify">密码修改</el-menu-item>
            </el-submenu>  -->

            <!-- 商品管理 -->
            <!-- <el-submenu index="3">
                <template slot="title">
                    <span class="iconfont">&#xe65d;</span>
                    <span>商品管理</span>
                </template>             
                <el-menu-item index="/index/goodsmanage">商品管理</el-menu-item>
                <el-menu-item index="/index/goodsadd">商品添加</el-menu-item>
            </el-submenu>  -->

            

        </el-menu>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            // 导航数据
            menuDate:[
                // 系统管理
                {
                    menuTitle:'系统管理',
                    icon_code:'&#xe60b',
                    childern:[
                        {
                            path:'/index',
                            subMenuTitle:'系统信息'
                        }
                    ]
                },
                // 商品管理
                {
                    menuTitle:'商品管理',
                    icon_code:'&#xe65d',
                    childern:[
                        {
                            path:'/index/goodsmanage',
                            subMenuTitle:'商品管理'
                        },
                        {
                            path:'/index/goodsadd',
                            subMenuTitle:'商品添加'
                        }
                    ]
                },
                // 账号管理
                {
                    menuTitle:'账号管理',
                    icon_code:'&#xe60b',
                    childern:[
                        {
                            path:'/index/accountmanage',
                            subMenuTitle:'账号管理'
                        },
                        {
                            path:'/index/accountadd',
                            subMenuTitle:'账号添加'
                        },
                        {
                            path:'/index/passwordmodify',
                            subMenuTitle:'密码修改'
                        }
                    ]
                },
                               
            ]

        }
    },
    methods: {
    
    }

}
</script>

<style lang = "less">
  @import './Leftnav.less';
</style>
