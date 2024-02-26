---
sidebar_position: 3
---

# Logging
By default, `HutchAgent` logs to the console. This is sufficient in development situations. However, in production, it is more practical to capture the logs with centralised services like [Seq](https://datalust.co/seq).

## Configure `Seq` in `HutchAgent`
Logging settings come under `Serilog`. To add `Seq` select a method from the following examples that best suits your set-up.

### `appsettings.json`
Add `"Serilog.Sinks.Seq"` to `Using`, like so:
```json
/// ...
"Using": [
  /// ...
  "Serilog.Sinks.Seq"
]
/// ...
```

... and add the `Seq` settings object to `"WriteTo"`, like so:
```json
/// ...
"WriteTo": [
  /// ...
  {
    "Name": "Seq",
    "Args": {
      "serverUrl": "http://localhost:5341"
    }
  }
]
/// ...
```
Feel free to substitute the `serverUrl` setting with your hosting location.

### Environment variables
Add the sink to `Using`:
```
Serilog__Using__X=Serilog.Sinks.Seq
```
where X is the **current** number of sinks + 1.

Now add a configuration object to `WriteTo`:
```
Serilog__WriteTo__X__Name=Seq
Serilog__WriteTo__X__Args__serverUrl=http://localhost:5341
```
again, where X is the **current** number of sinks + 1.

### .NET User Secrets
Add the sink to `Using`:
```
"Serilog:Using:X": "Serilog.Sinks.Seq"
```
where X is the **current** number of sinks + 1.

Now add a configuration object to `WriteTo`:
```
"Serilog:WriteTo:X:Name": "Seq",
"Serilog:WriteTo:X:Args:serverUrl": "http://localhost:5341"
```
again, where X is the **current** number of sinks + 1.

Other options for `Args` can be found [here](https://github.com/datalust/serilog-sinks-seq).
