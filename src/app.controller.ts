import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import myDTO from './myDTO.dto';
import { Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Post()
  getFormsData(@Res() res, @Body() MyDto: myDTO) {
    console.log(MyDto);

    let error = [];

    if (MyDto.username.trim().length < 1) {
      error.push("Hibás felhasználónév");
    }

    if (!/\d{8}-\d{8}-\d{8}/.test(MyDto.creditcard) && !/\d{24}/.test(MyDto.creditcard) && !/\d{8}-\d{8}/.test(MyDto.creditcard) && !/\d{16}/.test(MyDto.creditcard)) {
      error.push("Hibás bankszámlaszám");
    }

    if (typeof (MyDto.eula) == "undefined") {
      error.push("Nem fogadtad el a felhasználási feltételeket");
    }

    if (error.length < 1) {
      const fs = require('node:fs');
      console.log("ok");

      let tmp = MyDto.username+";"+MyDto.username+";";
      fs.writeFile('../public/myCSV.csv', tmp, err => {
        if (err) {
          console.error(err);
        } else {
          console.error("Success");
        }
      });


      res.redirect('mindenis');
    }

    console.log(error);
    res.render('index', {
      errors: error,
      username: MyDto.username
    })
  }

  @Get('mindenis')
  getMindenis() {
    return "OK"
  }



  @Get()
  @Render('index')
  getForm() {
    return {
      username: "",
      errors: []
    };
  }

}
