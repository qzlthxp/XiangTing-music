<template>
  <el-row style="width: 100%;min-width: 1440px;height: 100%;min-height: 100vh">
    <el-col style="height: 100%" :span="4">
      <el-menu
          style="min-height: 100%"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">我的歌单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" style="padding: 50px 0 0 50px">
      <el-row>
        <p style="font-size: 2rem; margin: 0 0 var(--default-margin) 0">歌单管理</p>
      </el-row>
      <el-row style="margin-bottom: 25px">
        <el-button style="background-color: #409EFF; color: #fff" @click="createNew">+ 新建歌单</el-button>
        <el-button style="margin-left: 25px">删除选中</el-button>
      </el-row>
      <el-table
          v-if="tableData.length"
          :data="tableData"
          style="width: 100%"
          show-overflow-tooltip
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column label="封面" width="100">
          <template slot-scope="scope">
            <el-image
                style="width: 80px; height: 80px"
                :src="tableData[scope.$index].play_lists_poster"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="play_lists_title"
            label="标题">
        </el-table-column>
        <el-table-column
            prop="play_lists_introduce"
            label="简介">
        </el-table-column>
        <el-table-column label="发布日期" width="100">
          <template slot-scope="scope">
            {{tableData[scope.$index].publishTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
            prop="play_number"
            label="播放数量"
            width="100"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <create
        v-show="showCreate"
        :cate="cate"
        @closeCreate="closeCreate"
        @createPlayLists="createPlayLists"
    >
    </create>
  </el-row>
</template>

<script>
import Create from "@/views/playListsManage/childrenComponents/Create";
import {getAllPlayLists, getCateManage, create} from "@/network/playlistsManage";
import {formatDate} from "@/common/utils";

export default {
  name: "PlayListsManage",
  data() {
    return {
      cate: [],
      info: {},
      tableData: [],
      multipleSelection: [],
      showCreate: false,
    }
  },
  watch: {
    tableDate: {
      deep: true,
      handler(newVal) {
        this.tableData = newVal;
      }
    }
  },
  filters: {
    formatDate,
  },
  components: {
    Create
  },
  created() {
    this.getAllCate();
    if (sessionStorage.getItem('manage_user_id')) {
      let user_id = sessionStorage.getItem('manage_user_id');
      this.getUserAllPlayLists(user_id);
    }
  },
  methods: {
    async getAllCate() {
      try {
        this.cate = (await getCateManage()).data;
      }catch (e) {
        return e;
      }
    },
    async getUserAllPlayLists(id) {
      try {
        this.tableData = (await getAllPlayLists(id)).playLists;
      }catch (e) {
        return e;
      }
    },
    async CreateNewPlayLists(obj) {
      try {
        let res = await create(obj);
        this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    createNew() {
      this.showCreate = true;
    },
    closeCreate() {
      this.showCreate = false;
    },
    createPlayLists(obj) {
      this.CreateNewPlayLists(obj);
      this.getUserAllPlayLists(sessionStorage.getItem('manage_user_id'));
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>

</style>