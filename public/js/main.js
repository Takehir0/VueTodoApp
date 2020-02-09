(function () {
  'use strict';

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function () {
        var item = {
          title: this.newItem,
          isDOne: false,
          userid: me.substr(0, 6)
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function () {
        if (!confirm('delete finished?')) {
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function () {
        return this.todos.filter(function (todo) {
          return !todo.isDone;
        });
      }
    }
  });

  const firebaseConfig = {
    apiKey: "AIzaSyCaMXG-MU0tkKtT7FvZ0JvqraFFCwLoSEA",
    authDomain: "myfirebasechatapp-f70fd.firebaseapp.com",
    databaseURL: "https://myfirebasechatapp-f70fd.firebaseio.com",
    projectId: "myfirebasechatapp-f70fd",
    storageBucket: "myfirebasechatapp-f70fd.appspot.com",
    messagingSenderId: "317059700587",
    appId: "1:317059700587:web:f52a76398d9fe480999e2e",
    measurementId: "G-G7QY185CM3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const auth = firebase.auth();
  let me = null;

  const login = document.getElementById('login');
  const logout = document.getElementById('logout');

  login.addEventListener('click', () => {
    auth.signInAnonymously();
  });

  logout.addEventListener('click', () => {
    auth.signOut();
  });

  auth.onAuthStateChanged(user => {
    if (user) {
      me = user.uid;
      console.log(`Logged in as: ${user.uid}`);
      login.classList.add('hidden');
      [logout, ul, purge, info, form].forEach(el => {
        el.classList.remove('hidden');
      });
      return;
    }
    me = null;
    console.log('Nobody is logged in');
    login.classList.remove('hidden');
    // form.classList.remove('hidden');
    [logout, ul, purge, info, form].forEach(el => {
      el.classList.add('hidden');
    });
  });
})();