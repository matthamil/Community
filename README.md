# Community

[![GitHub issues](https://img.shields.io/github/issues/matthamil/community.svg)](https://github.com/matthamil/Community/issues/)
[![](https://img.shields.io/github/issues-closed-raw/matthamil/Community.svg)]()

Community is a full-stack application helping connect volunteers with local nonprofit organizations. Community uses an ASP.NET backend with a React client.

[Watch the walkthrough on YouTube.](https://www.youtube.com/watch?v=NJayy2syyQY&t=222s)

## Table of Contents

* [Background](#background)

* [Install](#install)

* [License](#license)

## Background

Community is my full-stack capstone project for [Nashville Software School](http://www.nashvillesoftwareschool).

Community is a platform to connect volunteers with local nonprofit organizations. It serves nonprofit organizations by creating a platform where volunteers can sign up for events and event organizers can send all event-related communications through the application. Users can create accounts, search for events in their area, and attend events.

## Install

This project uses [.NET Core](https://www.microsoft.com/net/core) and [npm](https://www.npmjs.com/) to manage frontend dependencies.

Clone or download the project to your machine and run the following commands:

```sh
dotnet restore
dotnet ef database update
cd Client
npm install
dotnet run
```

In another terminal window, run the following commands:

```sh
npm run start
```

Navigate to localhost:5000 and log in, then navigate to localhost:3000 to view the app. The login portal is currently a WIP hence these steps.

## License

MIT (c) Matt Hamil