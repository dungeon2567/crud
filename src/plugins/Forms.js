import Vue from "vue";

const Forms = {
    name: 'Forms',

    data: {
        forms: [],
        formId: 0,
    },

    methods: {
        accepted(params, form) {
            this.forms.splice(this.forms.indexOf(form), 1);

            form.accept(params);
        },
        rejected(params, form) {
            this.forms.splice(this.forms.indexOf(form), 1);

            form.reject(params);
        },
        open(component, params) {
            return new Promise((resolve, reject) => {
                this.forms.push({ id: ++this.formId, component, params, accept: resolve, reject });
            });
        }
    },

    render(h) {
        return <transition-group name="overlay">
            {this.forms.map(form => {
                const $component = form.component;

                return (
                    <$component
                        {...{
                            props: {
                                accept: params => this.accepted(params, form),
                                reject: params => this.rejected(params, form),
                                ...form.params
                            }
                        }}
                        key={form.id}
                    />
                );
            })}
            />
      </transition-group>
    }
}

export default {
    install(vue) {
        const node = document.createElement('div');
        document.body.appendChild(node);

        const forms = new Vue(Forms);

        forms.$mount(node);

        vue.prototype.$forms = forms;
    }
}