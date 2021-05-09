package main

import (
  "github.com/gin-gonic/gin"
  "github.com/guionardo/mappa_proxy/mappa"
  "os"
)

func healthCheck(context *gin.Context) {
  // Test mappa api
  statusCode, status, err := mappa.Ping()
  statusHealthy := "HEALTHY"
  if err != nil || statusCode < 1 || statusCode >= 400 {
    statusHealthy = "UNHEALTHY"
  }
  context.JSON(200, gin.H{"status": statusHealthy, "mappa_server": gin.H{"status_code": statusCode, "status": status}})

}

func setupServer() *gin.Engine{
  r := gin.Default()
  r.GET("/hc", healthCheck)
  r.GET("/mappa/*request", mappa.MappaGetRequest)
  r.POST("/mappa/*request", mappa.MappaPostRequest)
  return r
}

func main() {
  port := os.Getenv("PORT")
  if len(port) == 0 {
    port = "8081"
  }
  setupServer().Run(":"+port)
}
