<template>
  <div class="play-lists-manage">
    <el-col :span="4">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
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
        <p style="font-size: 2rem; margin: 0 0 var(--default-margin) 0">
          歌单管理
        </p>
      </el-row>
      <el-row style="margin-bottom: 25px">
        <el-button
          style="background-color: #409EFF; color: #fff"
          @click="createNew"
          >+ 新建歌单</el-button
        >
        <el-popconfirm
          style="margin-left: 25px"
          title="这是一段内容确定删除吗？"
          @confirm="handleDelAll"
        >
          <el-button slot="reference">删除选中</el-button>
        </el-popconfirm>
      </el-row>
      <el-table
        v-if="tableData.length"
        :data="tableData"
        style="width: 100%"
        show-overflow-tooltip
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column label="封面" width="100">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="tableData[scope.$index].play_lists_poster"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="play_lists_title" label="标题">
        </el-table-column>
        <el-table-column prop="play_lists_introduce" label="简介" width="350">
        </el-table-column>
        <el-table-column label="发布日期" width="100">
          <template slot-scope="scope">
            {{ tableData[scope.$index].publishTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="play_number" label="播放数量" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              style="margin-right: 10px"
              v-if="scope.row.private"
              size="mini"
              slot="reference"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
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
    <play-lists-editor
      v-if="showEditor"
      :editorInfo="editorInfo"
      :editorSongs="editorSongs"
      @closeEditor="closeEditor"
      @update-play-lists-info="updatePlayListsInfo"
      @delete-song-of-play-lists="deleteSong"
    ></play-lists-editor>
  </div>
</template>

<script>
import Create from '@/views/playListsManage/childrenComponents/Create'
import PlayListsEditor from '@/views/playListsManage/childrenComponents/PlayListsEditor'
import {
  getAllPlayLists,
  getCateManage,
  create,
  upDate,
  delPlayLists,
  getSongsInfo,
  deleteSongOfPlayLists
} from '@/network/playlistsManage'
import { getSongsByPlayListsId } from '@/network/playListsDetail'
import { formatDate } from '@/common/utils'

export default {
  name: 'PlayListsManage',
  data() {
    return {
      cate: [],
      editorInfo: {},
      editorSongs: [],
      tableData: [],
      multipleSelection: [],
      ids: [],
      showCreate: false,
      showEditor: false,
      play_lists_id: 0,
    }
  },
  watch: {
    tableDate: {
      deep: true,
      handler(newVal) {
        this.$nextTick(() => {
          this.tableData = newVal
        })
      },
    },
  },
  filters: {
    formatDate,
  },
  components: {
    Create,
    PlayListsEditor
  },
  created() {
    this.getAllCate()
    if (sessionStorage.getItem('music_user_id')) {
      let user_id = sessionStorage.getItem('music_user_id')
      this.getUserAllPlayLists(user_id, user_id)
    }
  },
  methods: {
    async getAllCate() {
      try {
        this.cate = (await getCateManage()).data
      } catch (e) {
        return e
      }
    },
    async getUserAllPlayLists(userId, currentUserId) {
      try {
        this.tableData = (await getAllPlayLists(1, 1)).playLists
      } catch (e) {
        return e
      }
    },
    async createNewPlayLists(obj) {
      try {
        let res = await create(obj)
        this.$toasted.show(res.message)
      } catch (e) {
        return e
      }
    },
    async deletePlayLists(ids) {
      try {
        let res = await delPlayLists(ids)
        this.$toasted.show(res.message)
      } catch (e) {
        return e
      }
    },
    async getSongs(id) {
      try {
        let ids = (await getSongsByPlayListsId(id)).songs
        this.editorSongs = (await getSongsInfo(ids.join(','))).songs
      } catch (error) {
        return error
      }
    },
    async deleteSong(ids) {
      try {
        let res = await deleteSongOfPlayLists(ids, this.play_lists_id)
        for (let val of ids) {
          for (let i in this.editorSongs) {
            if (this.editorSongs[i].id === val) {
              this.editorSongs.splice(i, 1)
            }
          }
        }
        if (res.status) {
          this.$toasted.show(res.message)
        }
      }catch (err) {
        return err;
      }
    },
    createNew() {
      this.showCreate = true
    },
    closeCreate() {
      this.showCreate = false
    },
    closeEditor() {
      this.showEditor = false
    },
    createPlayLists(obj) {
      this.createNewPlayLists(obj)
      this.closeCreate()
      setTimeout(() => {
        let userId = sessionStorage.getItem('music_user_id')
        this.getUserAllPlayLists(userId, userId)
      }, 250)
    },
    async updatePlayListsInfo(obj) {
      try {
        let res = await upDate(obj)
        if (res.status) {
          this.$toasted.show(res.message)
        }
        let userId = sessionStorage.getItem('music_user_id')
        await this.getUserAllPlayLists(userId, userId)
        await this.closeEditor()
      } catch (error) {
        return error;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelAll() {
      this.multipleSelection.forEach((value) => {
        this.ids.push(value.play_lists_id)
      })
      this.deletePlayLists(this.ids)
      this.multipleSelection = []
      setTimeout(() => {
        let userId = sessionStorage.getItem('music_user_id')
        this.getUserAllPlayLists(userId, userId)
      }, 250)
    },
    handleEdit(row) {
      this.showEditor = true
      this.editorInfo = row
      this.getSongs(row.play_lists_id)
      this.play_lists_id = row.play_lists_id
    },
    handleDelete(index, row) {
      this.ids.push(row.play_lists_id)
      this.deletePlayLists(this.ids)
      setTimeout(() => {
        let userId = sessionStorage.getItem('music_user_id')
        this.getUserAllPlayLists(userId, userId)
      }, 250)
    }
  },
}
</script>

<style scoped>
.play-lists-manage {
  width: 100%;
  min-width: 1440px;
  min-height: 100vh;
  padding-right: calc(var(--default-padding) / 2);
  overflow: auto;
}
</style>
