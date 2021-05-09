package mappa

import (
  "bytes"
  "github.com/gin-gonic/gin"
  "io/ioutil"
  "log"
  "net/http"
  "strings"
)

const UrlMappa = "http://mappa.escoteiros.org.br"
var HttpClient = &http.Client{}


func MappaGetRequest(c *gin.Context) {
  tudo := c.Param("request")
  url := UrlMappa + tudo

  if strings.Contains(c.Request.RequestURI, "?") {
    queryArgs := strings.SplitAfterN(c.Request.RequestURI, "?", 2)[1]
    url += "?" + queryArgs
  }
  req, err := http.NewRequest("GET", url, nil)
  if err != nil {
    log.Fatal(err)
  }

  cloneHeaders(c, req)

  resp, err := HttpClient.Do(req)
  defer resp.Body.Close()
  if err != nil {
    log.Fatal(err)
  }
  body, err := ioutil.ReadAll(resp.Body)
  if err == nil {
    c.Header("Content-Type", "application/json")
    c.Status(resp.StatusCode)
    c.Writer.Write(body)
  } else {
    c.JSON(resp.StatusCode, gin.H{"message": "mAPPa Backend error", "status": resp.Status, "error": err})
  }
}

func Ping() (int, string, error) {
  res, err := http.Head(UrlMappa)

  if err != nil {
    return res.StatusCode, res.Status, err
  }
  return res.StatusCode, res.Status, nil
}

func MappaPostRequest(c *gin.Context) {
  tudo := c.Param("request")
  url := UrlMappa + tudo
  //c.JSON(200, gin.H{"OK": true, "WHAT": tudo, "URL": url})

  if strings.Contains(c.Request.RequestURI, "?") {
    queryArgs := strings.SplitAfterN(c.Request.RequestURI, "?", 2)[1]
    url += "?" + queryArgs
  }
  requestBody, err := ioutil.ReadAll(c.Request.Body)

  log.Printf("Post request %v: %v",url,string(requestBody))
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
  if err != nil {
    log.Fatal(err)
  }

  cloneHeaders(c, req)

  resp, err := HttpClient.Do(req)
  defer resp.Body.Close()
  if err != nil {
    log.Fatal(err)
  }
  body, err := ioutil.ReadAll(resp.Body)
  if err == nil {
    c.Header("Content-Type", "application/json")
    c.Status(resp.StatusCode)
    log.Printf("Post response: %v",string(body))
    c.Writer.Write(body)
  } else {
    c.JSON(resp.StatusCode, gin.H{"message": "mAPPa Backend error", "status": resp.Status, "error": err})
  }
}

func cloneHeaders(c *gin.Context, req *http.Request) {
  allowedHeaders := []string{"Authorization", "User-Agent","Host"}
  for _, s := range allowedHeaders {
    headerValue := c.GetHeader(s)
    if len(headerValue) > 0 {
      req.Header.Set(s, headerValue)
    }
  }
}
