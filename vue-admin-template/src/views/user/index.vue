<template>
  <div class="app-container">
    <el-table :data="userList" border fit highlight-current-row>
      <el-table-column align="center" label="用户ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="350">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" width="350">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="115" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="doDelete(scope.row.user_id)"
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
      userList: [],
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.listLoading = true;
      this.axios.get("http://localhost:3000/user/userList").then((res) => {
        let { users } = res.data;
        this.userList = users;
      });
    },
    doDelete(userId){
      this.axios
        .get("http://localhost:3000/user/deleteUser",{
          params:{
            userId,
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
