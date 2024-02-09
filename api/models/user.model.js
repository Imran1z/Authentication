import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
      },

    profile:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAM1BMVEXk5ueutLeqsbTN0dPn6eqnrrHq7O3b3t/Q1NXe4eKxt7rT1tjJzc+2u77GyszX2tu+w8UNryZuAAADoklEQVR4nO2cW5LjIAwAAQsw2Bjuf9oBJ/PYzCQBYQRbRX/mq0tCPOUwNplMJpPJZDKZTCaTyWTSH1AKmPbea6OU6m3zSFRbApdSJKSwYTXxt1EA5XcnBP+BkDzsZhBF0I7/Y3d3FDyMoAg6yN92n3EMurMiqPBX9L4V+dK1XsDbV3qnouuYZ1je2J2G1nczPN6F767YKc0Q8vw4l2uPGMKe6xdj2MEQMvN7jyH5OIStxC9CXMtgyvTibEPqx1h2gXwZBspSVkupXzQkXfWeLr8vIExyWQV/hXAhE9QIvQSVHy6AKYRUoxDnx7mlESxZ4x5CuJEYgkP6cXGQ+GFLJGJJBNEZTnsGCsPiVe4bcVAMQov2izkmWJANZpn7CiFBBH2VoG7uV1MjJDNhPKnXsLcXRE/TJ+3LWNUUMeehvWCVn5iC/4Hg8GNw+Cqu2Ctwinlw+JWEbYOvxePvZobfD1btqNvXSLo5H/xMUnOqo7k/Gv1cPP7NAv5uxhH5YW+3JNntlkZOhWR3wMgb1pXKjw1/R42arCXt2zbinYTUr3w5oX5pgtJtIXnzQtl6Qv/aWTbX9HgvTi/uuVmmW0IeyO1Z6BK/BKwvm2bueh27Pobvmxm/84idrWXyqaI8evdunYrecfHbUQg7RPdbBED/7h8Ubpj+QZYUmVnjaDwthZCDdWDeUQqM3zavDajh5FIQ1U9gFEVIJkb7dT+Cc+dZxVoXwrFs2pgz+R3lUk6XKBZrQj4UiUg/2XDsm2adEg5sO6y9F8bTiVrEgIaFumAgRm538vkE/agp7bFpsmyD0sefU/NLx9T8TaEYJ7wlYwvzRDLoxskG8MFWXAFHxabjEbY/e86LFLndW9nFTUHN/fkPx6XFKq20K6yLF4p2vXpuBJN9QspUvPYcAOvbrX2poTiuqxZg7mK9G1ddCMezWxvEJTtuUMgL3xzDC058YNqk91Ox9kwP+urqeKDyOwTwTe0SVQ1xxQ37GCTekCB+CXQMSeKXkLg2/+IPHvDgGqxNXf9JGYhFJf+LpUsonrFhv3T38g5R+hAKnjR+iFKmHIA3ijpqiBN8UvYlAnGCEyVzDfZJvY6C17yKxpMK8kPYJ4Alo7CPH5eZ6wmsnQRz21bwnUXV5L2qYJtO6skrk2anzAzBkJXiTjWcsCZHsN8Q5DJnQTb9Apj3+aem3yd8k9Ncs/YUdO+PT3Dc/pOlExnnO7/0JGMMpue3fuQITiaTyZV8AAGUM3UrSu8AAAAAAElFTkSuQmCC",
    }

    

},{timestamps:true});

const User =mongoose.model('User',userSchema);

export default User;