import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            form: {},
            waiting: false,
            loading: false
        }
    },

    computed: {
        ...mapGetters({
            model: 'company/model',
            rules: 'company/rules'
        })
    },

    methods: {
        submit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
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
        },

        close() {
            this.form = JSON.parse(JSON.stringify(this.model))
            this.$emit('close', this.drawer);
        }
    }
}