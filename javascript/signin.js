module.exports {
	Vue.component('signinshow', {
	  template: `
	    <el-main>
			<div id="SignInTable">
				<img id="peo" src="../assets/people.png">
				<div>
					<p id="SignTitle">Sign In For E-Order</p>
				</div>
				<el-form :model="signInForm" status-icon :rules="signIn" ref="signInForm" label-width="100px">
				  <el-form-item label="用户名" prop="username">
				    <el-input v-model.number="signInForm.username" id="inputa"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="signInForm.pass" auto-complete="off" id="inputb"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('signInForm')" id="signInButton">登陆</el-button>
				  </el-form-item>
				</el-form>
			</div>

		</el-main>
	  `
	})
}
