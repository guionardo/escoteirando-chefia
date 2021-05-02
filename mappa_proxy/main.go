package main

import (
  "github.com/gin-gonic/gin"
  "io/ioutil"
  "log"
  "net/http"
  "strings"
)

const MAPPA_URL = "http://mappa.escoteiros.org.br"

var HTTP_CLIENT = &http.Client{}

func Ping() (int, string, error) {
  res, err := http.Head(MAPPA_URL)

  if err != nil {
    return res.StatusCode, res.Status, err
  }
  return res.StatusCode, res.Status, nil
}

func MappaGetRequest(c *gin.Context) {
  tudo := c.Param("request")
  url := MAPPA_URL + tudo

  if strings.Contains(c.Request.RequestURI, "?") {
    queryArgs := strings.SplitAfterN(c.Request.RequestURI, "?", 2)[1]
    url += "?" + queryArgs
  }
  req, err := http.NewRequest("GET", url, nil)
  if err != nil {
    log.Fatal(err)
  }

  cloneHeaders(c, req)

  resp, err := HTTP_CLIENT.Do(req)
  defer resp.Body.Close()
  if err != nil {
    log.Fatal(err)
  }
  body, err := ioutil.ReadAll(resp.Body)
  if err == nil {
    c.Header("Content-Type", resp.Header.Get("Content-Type"))
    c.Status(resp.StatusCode)
    c.Writer.Write(body)
  }

}

func cloneHeaders(c *gin.Context, req *http.Request) {
  allowedHeaders := []string{"Authorization", "User-Agent", "Accept", "Accept-Encoding", "Accept-Language", "Host"}
  for _, s := range allowedHeaders {
    headerValue := c.GetHeader(s)
    if len(headerValue) > 0 {
      req.Header.Set(s, headerValue)
    }
  }
}

func MappaPostRequest(c *gin.Context) {
  tudo := c.Param("request")
  url := MAPPA_URL + tudo
  c.JSON(200, gin.H{"OK": true, "WHAT": tudo, "URL": url})
}
func healthCheck(context *gin.Context) {
  // Test mappa api
  statusCode, status, err := Ping()
  statusHealthy := "HEALTHY"
  if err != nil || statusCode < 1 || statusCode >= 400 {
    statusHealthy = "UNHEALTHY"
  }
  context.JSON(200, gin.H{"status": statusHealthy, "mappa_server": gin.H{"status_code": statusCode, "status": status}})

}

func main() {
  r := gin.Default()
  r.GET("/hc", healthCheck)
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{"message": "pong"})
  })
  r.GET("/mappa/*request", MappaGetRequest)
  r.POST("/mappa/*request", MappaPostRequest)
  r.Run("localhost:8081")
}
