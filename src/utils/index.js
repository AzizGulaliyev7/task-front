
/**
 * For alerts.
 */

export function notify(res) {
    try {
        if (res.success) {
            this.$notify({
                title: 'Successful',
                type: "success",
                message: res.message
            });
        } else {
            if (res.error && res.error.code == 422) {
                let ms = '';
                for (const key in res.validation_errors) {
                    if (res.validation_errors.hasOwnProperty(key)) {
                        const element = res.validation_errors[key];
                        ms += (element.join("<br>") + "<br>")
                    }
                }
                this.$message({
                    dangerouslyUseHTMLString: true,
                    title: 'Warning!',
                    message: ms,
                    type: 'warning',
                    duration: 15000,
                    showClose: true,
                });
            } else if (res.error && res.error.code == 423) {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    title: 'Warning!',
                    message: (res.error) ? (res.error.message) : res.message,
                    type: 'warning',
                    duration: 15000,
                    showClose: true,
                });
            }else {
                this.$notify({
                    title: 'Error',
                    type: "error",
                    message: (res.error) ? (res.error.message + ' Код: ' + res.error.code) : res.message
                });
            }
        }
    } catch (error) {
        alert(error)
    }
}

