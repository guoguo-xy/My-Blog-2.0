<template>
  <div class="app-container">
    <el-table :data="commList" border fit highlight-current-row>
      <el-table-column align="center" label="评论编号" width="95">
        <template slot-scope="scope">
          {{ scope.row.comm_id }}
        </template>
      </el-table-column>

      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="博客ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.blog_id }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="发表时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.post_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="doDelete(scope.row.comm_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      commList: [],
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.listLoading = true;
      this.axios.get("http://localhost:3000/blog/commList").then((res) => {
        let { comms } = res.data;
        this.commList = comms;
      });
    },
    doDelete(commId){
      console.log(commId);
      this.axios
        .get("http://localhost:3000/blog/deleteComm",{
          params:{
            commId,
          }
        }) .then((res)=>{
          let {state}=res.data
          if(state=='success')[
            this.$message('删除成功'),
            this.fetchData()
          ]
        })
    }
  },
};
</script>
