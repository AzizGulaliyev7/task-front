<template>
    <div>
        <h2>Xodimlar</h2>
        <el-row v-if="(role != 'admin')" :gutter="24">
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
                  prop="passport_number"
                  label="Passport raqami"
                  >
                </el-table-column>
                <el-table-column
                  prop="last_name"
                  label="Familyasi">
                </el-table-column>
                <el-table-column
                  prop="first_name"
                  label="Ismi"
                  >
                </el-table-column>
                <el-table-column
                  prop="middle_name"
                  label="Otasining Ismi"
                  >
                </el-table-column>
                <el-table-column
                  prop="position"
                  label="Lavozimi">
                </el-table-column>
                <el-table-column
                  prop="phone_number"
                  label="Telefon raqami"
                  >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="Manzili"
                  >
                </el-table-column>
                <el-table-column
                  prop="company"
                  label="Korxona"
                  >
                </el-table-column>
                <el-table-column
                  prop="created_at"
                  label="Created at"
                  width="180">
                </el-table-column>
                <el-table-column
                  v-if="(role != 'admin')"
                  label="Update"
                  width="90">
                  <template slot-scope="item">
                    <el-button size="mini" @click="edit(item.row)" type="primary">Update</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="(role != 'admin')"
                  label="Delete"
                  width="90">
                  <template slot-scope="item">
                    <el-button size="mini" @click="destroy(item.row)" type="danger">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </el-row>

        <el-drawer
          v-if="(role != 'admin')"
          @opened="openUpdate('drawerCreateChild')"
          @closed="afterClosed()"
          ref="drawerCreate"
          size="55%"
          title="Create Employee"
          :visible.sync="drawerCreate"
          direction="rtl">
            <create @close="closeDrawer" ref="drawerCreateChild" drawer="drawerCreate"></create>
        </el-drawer>

        <el-drawer
          v-if="(role != 'admin')"
          @opened="openUpdate('drawerUpdateChild')"
          @closed="afterClosed()"
          ref="drawerUpdate"
          size="55%"
          title="Update Employee"
          :visible.sync="drawerUpdate"
          direction="rtl">
            <update :employee="selectedItem" @close="closeDrawer" ref="drawerUpdateChild" drawer="drawerUpdate"></update>
        </el-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Create from "./components/create";
import Update from "./components/update";
import store from "@/store/index";

export default {
  name: "EmployeeIndex",
  components:{ Create, Update},

  data() {
    return {
        drawerCreate: false,
        drawerUpdate: false,
        loadingData: false,
        selectedItem: {},
        role: store.getters.role
    };
  },

  computed: {
    ...mapGetters({
      list: 'employee/list',
    })
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    ...mapActions({
      updateList: 'employee/index',
      delete: 'employee/destroy',
      emptyModel: 'employee/emptyModel',
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
