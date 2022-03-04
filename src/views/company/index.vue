<template>
    <div>
        <h2>Korxona</h2>
        <el-row :gutter="24">
          <el-col :span="3" :offset="21"><el-button @click="drawerCreate = true" type="success">Create</el-button></el-col>
        </el-row>
        <el-row :gutter="24" v-loading="loadingData">
            <template>
              <el-table
                :data="list"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="ID"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="Korxona nomi"
                  >
                </el-table-column>
                <el-table-column
                  prop="ceo_name"
                  label="Korxona Raxbari (FISH)">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Manzil"
                  >
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="Email"
                  >
                </el-table-column>
                <el-table-column
                  prop="web_site"
                  label="Veb sahifa">
                </el-table-column>
                <el-table-column
                  prop="phone_number"
                  label="Telefon raqam"
                >
                </el-table-column>
                <el-table-column
                  prop="created_at"
                  label="Created at"
                  width="180">
                </el-table-column>
                <el-table-column
                  label="Update"
                  width="80">
                  <template slot-scope="item">
                    <el-button size="mini" @click="edit(item.row)" type="primary">Update</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Delete"
                  width="80">
                  <template slot-scope="item">
                    <el-button size="mini" @click="destroy(item.row)" type="danger">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </el-row>

        <el-drawer
          @opened="openUpdate('drawerCreateChild')"
          @closed="afterClosed()"
          ref="drawerCreate"
          size="55%"
          title="Create Company"
          :visible.sync="drawerCreate"
          direction="rtl">
          <create @close="closeDrawer" ref="drawerCreateChild" drawer="drawerCreate"></create>
        </el-drawer>

        <el-drawer
          @opened="openUpdate('drawerUpdateChild')"
          @closed="afterClosed()"
          ref="drawerUpdate"
          size="55%"
          title="Update Company"
          :visible.sync="drawerUpdate"
          direction="rtl">
          <update :company="selectedItem" @close="closeDrawer" ref="drawerUpdateChild" drawer="drawerUpdate"></update>
        </el-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Create from "./components/create";
import Update from "./components/update";

export default {
  name: "CompanyIndex",
  components:{ Create, Update},

  data() {
    return {
        drawerCreate: false,
        drawerUpdate: false,
        loadingData: false,
        selectedItem: {}
    };
  },

  computed: {
    ...mapGetters({
      list: 'company/list',
    })
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    ...mapActions({
      updateList: 'company/index',
      delete: 'company/destroy',
      emptyModel: 'company/emptyModel',
    }),

    afterClosed() {
      this.emptyModel();
      this.fetchData();
    },

    fetchData() {
        if (!this.loadingData) {
            this.loadingData = true;
            this.updateList().then(res => {
                this.loadingData = false
            }).catch(err => {
                this.loadingData = false
            });
        }
    },

    edit(model) {
        this.selectedItem = model;
        this.drawerUpdate = true;
    },

    destroy(model) {
      this.$confirm('Close', 'Are you sure to delete', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then( () => {
        this.delete(model.id)
            .then(res => {
                this.$alert(res);
                this.fetchData()
            })
            .catch(err => {
                this.$alert(err);
            })
          }).catch(() => {})
    },

    closeDrawer(drawer) {
      if (this.$refs[drawer] && _.isFunction(this.$refs[drawer].closeDrawer)) {
        this.$refs[drawer].closeDrawer();
      }
    },

    openUpdate(drawer) {
      if (this.$refs[drawer] && _.isFunction(this.$refs[drawer].afterOpen)) {
        this.$refs[drawer].afterOpen();
      }
    }
  }
};
</script>
<style>
</style>
