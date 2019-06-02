import Vue from "vue";

const Notifications = {
    name: 'Notifications',

    data: {
        notifications: [],
        notificationId: 0,
    },

    methods: {
        add(config) {
            const id = ++this.notificationId;

            const notification = {
                id,
                message: config.message,
                intent: config.intent,
                icon: config.icon
            };

            this.notifications.push(notification);

            const close = () => {
                this.remove(notification);
            }

            notification.__timeout = setTimeout(() => {
                notification.__timeout = null;
                close();
            }, 3000)

            return close
        },

        remove(notif) {
            if (notif.__timeout) { clearTimeout(notif.__timeout) }

            const index = this.notifications.indexOf(notif);

            if (index !== -1) {
                this.notifications.splice(index, 1)
            }
        }
    },

    render(h) {
        return <transition-group class={"notification-container"} tag="div" name="notification">
            {this.notifications.map(notification => (
                <div key={notification.id} class={`notification ${notification.intent}`}>
                    {notification.icon && <i class={`${notification.icon} notification-icon`}></i>}
                    <div class="notification-message">
                        {notification.message}
                    </div>
                </div>
            ))}
        </transition-group>
    }
}

export default {
    install(vue) {
        const node = document.createElement('div');
        document.body.appendChild(node);

        const notifications = new Vue(Notifications);

        notifications.$mount(node);

        vue.prototype.$notifications = notifications;
    }
}