---
sidebar_position: 1
---

import pdAdaptor from './media/image1.png';
import newPDdecoy from './media/image11.png';
import dsc00971 from './media/DSC00971.jpg';
import ch224kPdModule from './media/image.png';
import amazonPdAdaptor from './media/image2.png';
import usbHubProduct from './media/b31a7f63-649e-4bee-8a1c-6643e5923d2e.png';
import dsc00960 from './media/DSC00960.jpg';
import dsc00959 from './media/DSC00959.jpg';
import sl21aHubChip from './media/image3.png';
import sl21aDatasheet from './media/image4.png';
import typeCMaleAdapter from './media/555f2fd1-4511-4812-8515-f9f4ac137835.png';
import kicadTypeCBreakoutOne from './media/image5.png';
import kicadTypeCBreakoutTwo from './media/image6.png';
import kicadTypeCBreakoutThree from './media/image7.png';
import dsc00935 from './media/DSC00935.jpg';
import dsc00931 from './media/DSC00931.jpg';
import dsc00933 from './media/DSC00933.jpg';
import typeCBreakoutBoard from './media/190d2938-1538-46e0-8dc3-adf1a197652f.png';
import kicadUsbHubOne from './media/image8.png';
import kicadUsbHubTwo from './media/image9.png';
import kicadUsbHubThree from './media/image10.png';
import dsc00936 from './media/DSC00936_(Medium).jpg';
import dsc00953 from './media/DSC00953.jpg';
import dsc00957 from './media/DSC00957.jpg';
import dsc00967 from './media/DSC00967.jpg';
import dsc00966 from './media/DSC00966.jpg';
import dsc00973 from './media/DSC00973.jpg';
import robomanPdModule from './media/image12.png';


# USB-C PD Hub (4-Port)

*[Saheen Palayi](https://saheenpalayi.com/) | [Super Fablab Kerala](https://fablabkerala.in/) - Kochi, India | 20 April 2026*


<div style={{ textAlign: 'center' }}>
  <img src={dsc00971} width="90%" alt="DSC00971" />
</div>

## Intro

I’ve this Idea pondering around in my thoughts for last two years and finally i decided to solve it.  The idea is to make a Type C Hub which also have PD capabilities. a hub like this not yet available in the market.  And there are PD adapters  are there but the circuit inside is very complex, so the idea is combine a USB Hub and PD adaptor together 

## USB PD

the USB PD works Using the CC lines in the Type C which negotioate with the host for the voltage it required. to Understand the PD closer , I’ve tried to make my own PD sink controller, I’ve used a Chinese chip [CH224K](https://www.laskakit.cz/user/related_files/ch224ds1.pdf) which is only cost  ₹50 (under $1) from WCH.

<div style={{ textAlign: 'center' }}>
  <img src={ch224kPdModule} width="50%" alt="CH224K PD module" />
</div>

GitHub Repo Link:- https://github.com/saheenpalayi/CH224K_USB_PD-Module

using this experiments I confirmed that the negotiation can be happen only using the CC lines and the DM DP lines not required , so this can be used for data transferring during the power comes from the PD sink Controller after negotiation with the host 

Inspiration

The Idea for this Project came to my mind during my visit at Maker fair Shenzhen where I get a chance to explore the biggest Chinese electronics market, and interestingly I found that the PD adaptors are so popular and widely available in the market even with multiple ports mentioned each type C ports can deliver 100 watt power simultaneously , the Gan technology is really Interesting

<div style={{ textAlign: 'center' }}>
  <img src={pdAdaptor} width="50%" alt="PD Adaptor" />
</div>


From the Indian Market it was hard to find the same PD, and I couldn't buy this because I already hit my purchase limit : ).   and from Indian market I found a PD adaptor which only have 2 type C ports which supports PD , 

<div style={{ textAlign: 'center' }}>
  <img src={amazonPdAdaptor} width="50%" alt="Amazon India PD adaptor" />
</div>

Amzon India Link:- [https://www.amazon.in/Sell-Enterprise-A4809C-Universal-Charging/dp/B0BVMSNDXZ](https://www.amazon.in/Sell-Enterprise-A4809C-Universal-Charging/dp/B0BVMSNDXZ)

So Those PD towers in Shenzhen got me led this solution of making an attachment type USB hub which I can plug into the USB PD tower adaptor, and the HUB wont be having the power connected from the adaptor , the hub will be powered from  the Computer it connected to

**other reference PD Towers**

- [Bakeey YMX-635W](https://www.banggood.com/%5BGaN-Tech%5D-Bakeey-YMX-635W-635W-8-Port-USB-PD-Charger-3USB-A+5USB-C-PD-QC-Fast-Charging-Desktop-Charging-Station-EU-Plug-US-Plug-for-iPhone-16-16-Pro-15-14-13-for-Huawei-Pura-X-for-Samsung-Galaxy-S25-Ultra-p-2033908.html?gmcCountry=IN&currency=INR&cur_warehouse=CN&createTmp=1&ID=47184)
- [Bakeey YMX-600W](https://www.banggood.com/GaN-TechBakeey-YMX-600W-600W-8-Port-USB-PD-Charger-5USB-C+3USB-A-QC-PD3_1-Fast-Charging-Desktop-Charging-Station-EU-Plug-US-Plug-for-iPhone-16-16-Pro-15-14-13-Pro-Max-for-Xiaomi-15pro-for-Samsung-Galaxy-Z-Flip6-p-2028850.html?rmmds=product_topselling&cur_warehouse=CN&act_poa=POA11331278&ID=567117)
- [Bakeey YMX-600W](https://www.banggood.com/GaN-TechBakeey-YMX-600W-600W-8-Port-USB-PD-Charger-5USB-C+3USB-A-QC-PD3_1-Fast-Charging-Desktop-Charging-Station-EU-Plug-US-Plug-for-iPhone-16-15-Plus-14-13-12-Pro-for-Huawei-Mate-XT-for-Xiaomi-15pro-for-Oppo-A5-Pro-p-2028937.html?rmmds=detail-left-hotproducts&cur_warehouse=CN&ID=557641&trace_id=825a1777141100552)

**USB HUB**

I’ve been looking for a cheap USB Multiplexer then I found that USB Hub is enough for my exploration, so I bought a cheap USB hub from the market and opened it up for understanding its make and internal circuitry 

<div style={{ textAlign: 'center' }}>
  <img src={usbHubProduct} width="50%" alt="USB hub product" />
</div>

[https://www.amazon.in/Portronics-Mport-3-Port-Aluminium-Type-C/dp/B0DG2SRVW2](https://www.amazon.in/Portronics-Mport-3-Port-Aluminium-Type-C/dp/B0DG2SRVW2)

<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{flex: 1}}>
    <img src={dsc00960} alt="DSC00960" />
  </div>
  <div style={{flex: 1}}>
    <img src={dsc00959} alt="DSC00959" />
  </div>
</div>

SL2.1A USB 2.0 HUB

<div style={{ textAlign: 'center' }}>
  <img src={sl21aHubChip} width="90%" alt="SL2.1A USB hub chip" />
</div>

[https://jlcpcb.com/partdetail/CoreChips-SL21A/C192893](https://jlcpcb.com/partdetail/CoreChips-SL21A/C192893)

Luckily I found that the IC used for this Hub as  a USB 2.0 HUB chip is easily available in the market in cheaper rate (₹30 ) and I also found a version of it  (SOP16) which is Fabable package

<div style={{ textAlign: 'center' }}>
  <img src={sl21aDatasheet} width="90%" alt="SL2.1A datasheet circuit" />
</div>

image Credits:- [https://cdn-shop.adafruit.com/product-files/2991/1811151645_CoreChips-SL2-1A_C192893.pdf](https://cdn-shop.adafruit.com/product-files/2991/1811151645_CoreChips-SL2-1A_C192893.pdf)

The data sheet of the USB Hub chip also provides a circuit that we can follow and make our own USB Hub , the Hub Splits 1 USB port into 4 USB port. Apart from the connectors Just need a few capacitors and a 12 Mhz Crystal ( which said optional from [this project](https://github.com/xunker/simple_sl2.1a_usb_hub)).  

## Type C Male Connector , right angled

To workout my idea I need the power O/P connected from the PD adaptor to the USB hub’s Outputs with the CC1 and CC2 lines for power negotiations , and fabricating PCB for the type C connector in fabalab is little too complex so I bought few type C male break out board .

<div style={{ textAlign: 'center' }}>
  <img src={typeCMaleAdapter} width="70%" alt="USB Type-C male adapter" />
</div>

Image Credits:-[https://hubtronics.in/usb-type-c-male-adapter](https://hubtronics.in/usb-type-c-male-adapter)

this only have an output for the D-,D+, V and G , But I found out the other side of the board have the resistor connected with the cc line which I can remove and access it using a solder jumper wire. 

Kicad Design 

The another challenge is that the ports available in the PD adapter in vertical and I wanted it horizontal so I designed and made a small breakout board for the Type C male connector to keep the design suitable for the PD adapter 

<div style={{ textAlign: 'center' }}>
  <img src={kicadTypeCBreakoutOne} width="90%" alt="KiCad Type-C breakout design one" />
</div>

<div style={{ textAlign: 'center' }}>
  <img src={kicadTypeCBreakoutTwo} width="90%" alt="KiCad Type-C breakout design two" />
</div>

<div style={{ textAlign: 'center' }}>
  <img src={kicadTypeCBreakoutThree} width="90%" alt="KiCad Type-C breakout design three" />
</div>

<div style={{ textAlign: 'center' }}>
  <img src={dsc00935} width="90%" alt="DSC00935" />
</div>

<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{flex: 1}}>
    <img src={dsc00931} alt="DSC00931" />
  </div>
  <div style={{flex: 1}}>
    <img src={dsc00933} alt="DSC00933" />
  </div>
</div>

the above picture shows how I wired the CC1 and CC2 line to access.  and of course the power lines are not that thick, but that’s fine for now , because its testing 

# PD HUB USB 2.0

### Type C breakout Boards

just like I mentioned for the type c male port , its hard to mill the PCB in Fablab so I’ve used this Breakout board I’ve made long ago ([Repo Link](https://github.com/saheenpalayi/ProshPlay-Type_C-Breakout_Board)) 

<div style={{ textAlign: 'center' }}>
  <img src={typeCBreakoutBoard} width="90%" alt="Type-C breakout board" />
</div>

But I removed all of the 5.1K pull down resistors from the breakout so I can connect the connection directly from the resistors pads to the USB Hub board

### Kicad Design

<div style={{ textAlign: 'center' }}>
  <img src={kicadUsbHubOne} width="90%" alt="KiCad USB hub design one" />
</div>

<div style={{ textAlign: 'center' }}>
  <img src={kicadUsbHubTwo} width="90%" alt="KiCad USB hub design two" />
</div>

<div style={{ textAlign: 'center' }}>
  <img src={kicadUsbHubThree} width="90%" alt="KiCad USB hub design three" />
</div>




<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{flex: 1}}>
    <img src={dsc00936}  alt="DSC00936" />
  </div>
  <div style={{flex: 1}}>
    <img src={dsc00953}  alt="DSC00953" />
  </div>
</div>

<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{flex: 1}}>
    <img src={dsc00957}  alt="DSC00957" />
  </div>
  <div style={{flex: 1}}>
    <img src={dsc00967}  alt="DSC00967" />
  </div>
</div>

<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{flex: 1}}>
    <img src={dsc00966}  alt="DSC00966" />
  </div>
  <div style={{flex: 1}}>
    <img src={dsc00973}  alt="DSC00973" />
  </div>
</div>

[Urumbu PD](../motion-and-robotics/urmbu-pd.md)

## Other Ideas -

While Browsing I came across this little bods which comes with Type C PD and Buck converter , but these things only can supply up to 65 wat



<div style={{ textAlign: 'center' }}>
  <img src={newPDdecoy} width="50%" alt="PD Adaptor" />
</div>


Image Credit:- [https://www.flyrobo.in/pd65w-fast-charging-module-dc5525-input-type-c-pd3.1-pps-qc3.0-huawei-scp?tracking=ads](https://www.flyrobo.in/pd65w-fast-charging-module-dc5525-input-type-c-pd3.1-pps-qc3.0-huawei-scp?tracking=ads)

**PD65W Fast Charging Module DC5525 Input Type-C PD3.1 PPS QC3.0 Huawei SCP**

<div style={{ textAlign: 'center' }}>
  <img src={robomanPdModule} width="50%" alt="Roboman PD65W fast charging module" />
</div>

[https://roboman.in/product/pd65w-fast-charging-adapter-power-banks-module-usb-c-pd-65w/](https://roboman.in/product/pd65w-fast-charging-adapter-power-banks-module-usb-c-pd-65w/)

- https://ar.aliexpress.com/item/1005005576173830.html?gatewayAdapt=glo2ara

## References

- https://github.com/xunker/simple_sl2.1a_usb_hub
- https://www.lcsc.com/datasheet/C192893.pdf
- https://jlcpcb.com/partdetail/CoreChips-SL21A/C192893
- https://zbotic.in/product/sl2-1a-usb2-0-high-speed-4-port-hub-controller-smd-sop16/#&gid=1&pid=1
- https://grabcad.com/library/usb-3-1-type-c-connector-male-adapter-pcb-board-1
