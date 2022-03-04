<template>
    <div>
      <el-row>
        <el-col :span="24"><div class="grid-content-top"></div></el-col>
      </el-row>
      <el-row type="flex" :gutter="24" justify="center">
        <el-col :span="6">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            label-position="top"
          >
            <el-form-item prop="email">
              <el-input
                @keyup.enter.native="login()"
                prefix-icon="el-icon-user"
                type="text"
                v-model="ruleForm.email"
                clearable
                placeholder="Emil"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                @keyup.enter.native="login()"
                prefix-icon="el-icon-lock"
                type="password"
                v-model="ruleForm.password"
                clearable
                placeholder="Password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="success" @click="login()" :loading="loading">Login</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>
<script>

import { mapActions } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      ruleForm: {
        password: "",
        email: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please, enter you email",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please, enter your password",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "Длина должна быть от 6 до 15",
            trigger: "blur"
          }
        ]
      },
      redirect: undefined,
      otherQuery: {},
      loading: false
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      postLogin: "auth/login"
    }),

    getOtherQuery(query) {
      
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },

    login() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.postLogin(this.ruleForm)
            .then(res => {
              this.loading = false;
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
            })
            .catch(err => {
              this.loading = false;
              this.$alert(err);
            });
        }
      });
    }
  }
};
</script>
<style>
  .grid-content-top {
    height: 200px;
  }
</style>
