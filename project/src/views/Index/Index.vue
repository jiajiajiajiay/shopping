<template>
    <div class="index">
        <!-- 布局容器 -->
        <el-container>
            <!-- 左边 -->
            <el-aside >
                <!-- 左侧导航 -->
                <Leftnav></Leftnav>
            </el-aside>
                 
            <!-- 右边 -->
            <el-container>

                <!-- 右边头部 -->
                <el-header>
                    <Rightheader></Rightheader>
                </el-header>   
                   
                <!-- 右边中间 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view></router-view>
                </el-main>
                
                
                <!-- 右边尾部 -->
                <el-footer>
                    <Rightfooter></Rightfooter>
                </el-footer>
                
            </el-container>
        </el-container>
    </div>
</template>

<script>
// 引入组件
import Leftnav from '@/components/Leftnav/Leftnav.vue'
import Rightheader from '@/components/Rightheader/Rightheader.vue'
import Rightfooter from '@/components/Rightfooter/Rightfooter.vue'

export default {
    components:{
        Leftnav,
        Rightheader,
        Rightfooter
    }
}
</script>

<style lang="less">
 @import './Index.less';

</style>