import { mapGetters, mapActions } from 'vuex';
import store from "@/store/index";

export default {
    data() {
        return {
            form: {},
            waiting: false,
            loading: false,
            role: store.getters.role
        }
    },

    computed: {
        ...mapGetters({
            model: 'employee/model',
            rules: 'employee/rules',
            userCompany: 'company/userCompany',
        })
    },

    methods: {
        ...mapActions({
            getUserCompany: 'company/getUserCompany',
        }),

        submit() {
            if (!this.userCompany) {
                this.$notify({
                    title: 'Warning!',
                    message: 'Korxona malumotlari mavjud emas. Avval Korxona malumotlarini kiriting!',
                    type: 'warning'
                  });
            } else {
                this.form.company_id = this.userCompany.id;
                this.$refs['form'].validate((valid) => {
                    if (valid && (this.role != 'admin')) {
                      this.waiting = true;
                      this.save(this.form)
                        .then(res => {
                            this.$alert(res);
                            this.close();
                            this.waiting = false;
                        })
                        .catch(err => {
                          this.waiting = false;
                          this.$alert(err);
                        });
                    }
                });
            }
        },

        close() {
            this.form = JSON.parse(JSON.stringify(this.model))
            this.$emit('close', this.drawer);
        }
    }
}