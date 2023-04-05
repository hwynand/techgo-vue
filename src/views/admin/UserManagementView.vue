<template>
    <div class="user-management">
        <div class="management-box">
            <div class="table-user">
                <div class="user-title">
                    <div class="table-title">
                        <p>Author</p>
                        <p>Email</p>
                        <p>Số điện thoại</p>
                        <p>Ngày sinh</p>
                        <span></span>
                    </div>
                </div>
                <div class="user-boder">
                    <div class="table-content">
                        <p class="content-p"><i class="fa-solid fa-user"></i> duy dũng</p>
                        <p>duydungkoll@gmail.com</p>
                        <p>09999999999</p>
                        <p>Ngày sinh</p>
                        <v-row justify="center">
                            <v-dialog v-model="dialog" persistent width="1024">
                                <template v-slot:activator="{ props }">
                                    <span v-bind="props"><i class="fa-solid fa-pen-to-square"></i></span>
                                    <span><i class="fa-solid fa-trash"></i></span>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">User Edit</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field label="Author*" required></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field label="Email*" type="text" required></v-text-field>
                                                </v-col>
                                                <div class="modal-col">
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field label="Số điện thoại*" type="text"
                                                            required></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field label="Ngày sinh*" type="date"
                                                            required></v-text-field>
                                                    </v-col>
                                                </div>
                                            </v-row>
                                        </v-container>

                                        <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                            Close
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </div>
                </div>
                <div class="title">
                    <h3>Table UserManagement</h3>
                </div>
                <!-- <ValidationProvider v-slot="v">
                    <input v-model="value" type="text">
                </ValidationProvider> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            dialog: false,
        }
    },

}
</script>

<style scoped>
.table-user {
    background-color: white;
    color: #2c3e50;
    padding-bottom: 18px;
    margin-top: 28px;
    border-radius: 12px;
    position: relative;
    height: auto;
}

.user-boder {
    border-top: 1px solid #bdc3c7;
    padding: 0 24px;
}

.user-title {
    padding: 0 24px;

}

.table-title {
    display: flex;

}

.table-title p {
    width: 22.5%;
    margin-top: 64px;
    padding: 0 8px;

}

.table-title span {
    width: 10%;
}

.table-content {
    display: flex;
    font-size: 0.9rem;
}

.table-content p {
    width: 22.5%;
    padding: 8px 0;
    padding-left: 8px;
}

.table-content span {
    width: 10%;
    padding: 8px 0;

}

.title {
    background-color: #0c2461;
    color: white;
    padding: 16px;
    position: absolute;
    width: 94%;
    top: -10%;
    left: 3%;
    border-radius: 10px;
}

.modal-col {
    display: flex;
}

.content-p i {
    margin-right: 4px;
}

.fa-solid {
    margin-left: 12px;
}

::v-deep .v-row {
    display: inline;
    margin: 0;
    padding: 8px 0;
    cursor: pointer;
}

::v-deep .v-row span {
    margin-right: 12px;
}

::v-deep .v-card-text {
    padding: 0 !important;
}

::v-deep .v-container {
    padding: 0;
}
</style>