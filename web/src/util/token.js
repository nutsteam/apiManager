class Token{
    constructor(){
        this.token = $.cookie('token');
    }

    setToken(token){
        this.token = token;
        $.cookie('token', token, { expires: 1 });
    }

    getToken(){
        return this.token;
    }

    removeToken(){
        $.cookie("token", '', { expires: -1 });

        this.token = null;
    }
}

export default new Token();