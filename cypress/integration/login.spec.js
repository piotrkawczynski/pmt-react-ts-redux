describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login")
  })

  it("UI rendered", () => {
    cy.get("[data-e2e='header']").contains("Project Management Tool")
    cy.get("[data-e2e='title']").contains("Sign In")
    cy.get("[data-e2e='label-email']").contains("Email")
    // cy.get("[data-e2e='title']").contains("")
    cy.get("[data-e2e='label-password']").contains("Password")
    cy.get("[data-e2e='link-forgotPassword']").contains("Forgot password")
    cy.get("[data-e2e='signIn']").contains("Sign in")
    cy.get("[data-e2e='link-register']").contains("Direct me to sign up")
  })

  it("Should login user", () => {
    cy.server()

    cy.route({
      method: "POST",
      url: "**/auth/login",
      status: 200,
      response: "fixture:loginSuccessResponse",
    }).as("loginCheck")

    cy.route({
      method: "GET",
      url: "**/projects",
      status: 200,
      response: [],
    }).as("getProjects")

    cy.get("[name='email']").type("test@example.com")
    cy.get("[name='password']").type("password")
    cy.get("[type='submit']").click()

    cy.wait(["@loginCheck", "@getProjects"])
  })

  it("Should show an error for invalid credentials", () => {
    cy.get("[name='email']").type("wrong@email.com")
    cy.get("[name='password']").type("password")
    cy.get("[type='submit']").click()

    cy.get("[data-e2e='error-email']").contains("Invalid email or password")
  })

  it("Form inputs not filled", () => {
    cy.get("[name='email']").focus()
    cy.get("[name='password']").focus()
    cy.get("[type='submit']").click()

    cy.get("[data-e2e='error-email']").contains("Email is required")
    cy.get("[data-e2e='error-password']").contains("Password is required")
  })

  it("Password too short", () => {
    cy.get("[name='email']").type("test@example.com")
    cy.get("[name='password']").type("pass")
    cy.get("[type='submit']").click()

    cy.get("[data-e2e='error-password']").contains("Password need to be minimum 8 length")
  })
})
