const R = 3440;   // Radius of the earth in NM
const nmd = R/360;    // NM per degree

export class GPSPoint {
    //  _lat : 0,
    //   _lon: 0,
    //   var name;
    //   var description;
    //   var timeStamp;
    //   var isValid;
     
    //  static var R=3440; // Radius of the earth in NM
    //  static var nmd = R/360; // NM per degree

      constructor(o)
      {
          this._lat = 0;
          this._lon = 0;
          this.name = "";
          this.description = "";
          this.timeStamp = new Date();
          this.isValid = false;
          if (o) loadFromObject(o);
      }
       
     get lat() {return _lat;}
     get lon() {return _lon;}
     set lat(l)
    {
        _lat = l;
        isValid = !(isNaN(_lat) || isNaN(_lon));
        //dispatchEvent(new SailPointEvent(SailPointEvent.COORDINATES_CHANGED));
    }
     set lon(l)
    {
        _lon = l;
        isValid = !(isNaN(_lat) || isNaN(_lon));
        //dispatchEvent(new SailPointEvent(SailPointEvent.COORDINATES_CHANGED) );
    }
        

    
    
    
    // loadFromObject loads _lat & _lon instead of lat/long to avoid double
    // dispatch of COORDINATES_CHANGED event
    // load object has to include a bogus parameters to conform to the same criteria
    // as the CourseMark loadFromObject. This is an issue with AS3
      loadFromObject(o)
    {
        this.name = o.name;
        this.description = o.description;
        this._lat = o.lat;
        this._lon = o.lon;
        this.isValid = !(isNaN(_lat) || isNaN(_lon));
        this.timeStamp = o.timeStamp;
        //dispatchEvent(new SailPointEvent(SailPointEvent.COORDINATES_CHANGED));

    }

    // returns the distance to a point in NM
     distanceTo(location) 
    {
        if (location == null) return Number.MAX_VALUE;
        var dLat = Angles.degreeToRad(location.lat-lat);
        var dLon = Angles.degreeToRad(location.lon-lon);
        
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(Angles.degreeToRad(lat)) * Math.cos(Angles.degreeToRad(location.lat)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        
        var distance = R * c; // Distance in NM
        
        return distance;
    }

    // returns the bearing to a point in degrees
     bearingTo(location) 
    {
        if (location == null) return Number.NaN;
        if (isNaN(location.lat)) return Number.NaN;
        
        var dLat = Angles.degreeToRad(location.lat-lat);
        var dLon = Angles.degreeToRad(location.lon-lon);
        
        var y = Math.sin(dLon) * Math.cos(Angles.degreeToRad(location.lat));
        var x = Math.cos(lat*(Math.PI/180))*Math.sin(Angles.degreeToRad(location.lat)) -
            Math.sin(Angles.degreeToRad(lat)) * Math.cos(Angles.degreeToRad(location.lat)) * Math.cos(dLon);
        
        return Angles.radToDegree(Math.atan2(y, x));
    }
    
    // returns a new GPSPoint that is distanceToMove away at a new bearing of angleToMove
     movePoint(distanceToMoveInNM, angleToMove)
    {
        var newPoint = new GPSPoint();
        var brng = Angles.degreeToRad(angleToMove);

        newPoint.lat = Math.asin( Math.sin(lat * (Math.PI/180))*Math.cos(distanceToMoveInNM/R) + 
            Math.cos(lat * (Math.PI/180))*Math.sin(distanceToMoveInNM/R)*Math.cos(brng) ) * (180/Math.PI);
        
        newPoint.lon = lon + Math.atan2(Math.sin(brng)*Math.sin(distanceToMoveInNM/R)*Math.cos(lat * (Math.PI/180)), 
            Math.cos(distanceToMoveInNM/R)-Math.sin(lat * (Math.PI/180))*Math.sin(newPoint.lat * (Math.PI/180))) * (180/Math.PI);
        
        return newPoint;
    }

    // moves this GPSPoint a distanceToMove away at a bearing of angleToMove
     moveThisPoint(distanceToMoveInNM, angleToMove) 
    {
        var brng = Angles.degreeToRad(angleToMove);
        var oldLat = lat;
        
        lat = Math.asin( Math.sin(lat * (Math.PI/180))*Math.cos(distanceToMoveInNM/R) + 
            Math.cos(lat * (Math.PI/180))*Math.sin(distanceToMoveInNM/R)*Math.cos(brng) ) * (180/Math.PI);
        
        lon = lon + Math.atan2(Math.sin(brng)*Math.sin(distanceToMoveInNM/R)*Math.cos(lat * (Math.PI/180)), 
            Math.cos(distanceToMoveInNM/R)-Math.sin(oldLat * (Math.PI/180))*Math.sin(lat * (Math.PI/180))) * (180/Math.PI);
    }

    /*****************************************************************
     * This routine will convert lat/lon to flat projection (x,y) coordinates
     * 
     * Mapping lat/lon to x/y coordinate is not easy because the earth
     * isn't flat. There are a number of ways of projecting a map on a 
     * flat screen, mercatur project is what we use.
     * Details outlined here:
     * http://stackoverflow.com/questions/14329691/covert-latitude-longitude-point-to-a-pixels-x-y-on-mercator-projection
     * 
     * ***************************************************************/
     getMercaturPoint()
    {
        var x = Angles.degreeToRad(lon);
        var latRad = Angles.degreeToRad(lat);
        var y = Math.log( Math.tan( (Math.PI / 4) + ( latRad / 2) ) );
        return {'x':x, 'y':y};
        
    }
    
    

    /**
     * Returns the point of intersection of two paths defined by point and bearing
     *
     *   see http://williams.best.vwh.net/avform.htm#Intersection
     *
     * @param   {LatLon} p1: First point
     * @param   {Number} brng1: Initial bearing from first point
     * @param   {LatLon} p2: Second point
     * @param   {Number} brng2: Initial bearing from second point
     * @returns {LatLon} Destination point (null if no unique intersection defined)
     * 
     * code and calculators here:
     * http://www.movable-type.co.uk/scripts/latlong.html
     * and here
     * http://www.movable-type.co.uk/scripts/latlon.js
     * 
     * NOTE: we do not use Utils.radToDegree function because we need to +/- 180 not 0-360
     * 
     */
     getIntersection(p1, brng1, p2, brng2)
    {
        var lat1,lon1;
        var lat2,lon2;
        var brng13;

        //LatLon.intersection = function(p1, brng1, p2, brng2) {
            lat1 = Angles.degreeToRad(p1.lat);
            lon1 = Angles.degreeToRad(p1.lon);
            lat2 = Angles.degreeToRad(p2.lat);
            lon2 = Angles.degreeToRad(p2.lon);
            brng13 = Angles.degreeToRad(brng1); 
            var brng23 = Angles.degreeToRad(brng2);
                
            var dLat = lat2-lat1
            var dLon = lon2-lon1;
            
            var dist12 = 2*Math.asin( Math.sqrt( Math.sin(dLat/2)*Math.sin(dLat/2) + 
                Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)*Math.sin(dLon/2) ) );
            if (dist12 == 0) return null;
            
            // initial/final bearings between points
            var brngA = Math.acos( ( Math.sin(lat2) - Math.sin(lat1)*Math.cos(dist12) ) / 
                ( Math.sin(dist12)*Math.cos(lat1) ) );
            if (isNaN(brngA)) brngA = 0;  // protect against rounding
            var brngB = Math.acos( ( Math.sin(lat1) - Math.sin(lat2)*Math.cos(dist12) ) / 
                ( Math.sin(dist12)*Math.cos(lat2) ) );
            
            if (Math.sin(lon2-lon1) > 0) {
                var brng12 = brngA;
                var brng21 = 2*Math.PI - brngB;
            } else {
                brng12 = 2*Math.PI - brngA;
                brng21 = brngB;
            }
            
            var alpha1 = (brng13 - brng12 + Math.PI) % (2*Math.PI) - Math.PI;  // angle 2-1-3
            var alpha2 = (brng21 - brng23 + Math.PI) % (2*Math.PI) - Math.PI;  // angle 1-2-3
            
            if (Math.sin(alpha1)==0 && Math.sin(alpha2)==0) return null;  // infinite intersections
            if (Math.sin(alpha1)*Math.sin(alpha2) < 0) return null;       // ambiguous intersection
            
            //alpha1 = Math.abs(alpha1);
            //alpha2 = Math.abs(alpha2);
            // ... Ed Williams takes abs of alpha1/alpha2, but seems to break calculation?
            
            var alpha3 = Math.acos( -Math.cos(alpha1)*Math.cos(alpha2) + 
                Math.sin(alpha1)*Math.sin(alpha2)*Math.cos(dist12) );
            var dist13 = Math.atan2( Math.sin(dist12)*Math.sin(alpha1)*Math.sin(alpha2), 
                Math.cos(alpha2)+Math.cos(alpha1)*Math.cos(alpha3) )
            var lat3 = Math.asin( Math.sin(lat1)*Math.cos(dist13) + 
                Math.cos(lat1)*Math.sin(dist13)*Math.cos(brng13) );
            var dLon13 = Math.atan2( Math.sin(brng13)*Math.sin(dist13)*Math.cos(lat1), 
                Math.cos(dist13)-Math.sin(lat1)*Math.sin(lat3) );
            var lon3 = lon1+dLon13;
            lon3 = (lon3+3*Math.PI) % (2*Math.PI) - Math.PI;  // normalise to -180...+180º
            
            // do NOT user Utils.radtoDegree to preserve +/-180 orientation
            return new GPSPoint({lat:(lat3 * 180 / Math.PI), lon:(lon3 * 180 / Math.PI)});
            

    }
    
    /************************************************************************************
     * 
     * These routine will return the gps points lat/lon formatted the proper way.
     * 
     * As such:
     * 
     * 	DDºMM'.mmm N DDºMM'.mmm W
     * 
     * 
     * ********************************************************************************/
     latString()
    {
        var str = toDMDecimal(Number.abs(lat));
        if (lat < 0) 
            str += "S  ";
        else
            str += "N  ";
        
        return str;
    }
     lonString()
    {
        var str = toDMDecimal(Number.abs(lon));
        if (lon < 0) 
            str += "W";
        else
            str += "E";
        
        return str;
    }
    
    

/************************************************************************************
 * 
 * These routine will return the gps points lat/lon formatted the proper way.
 * 
 * As such:
 * 
 * 	DDºMM'.mmm N DDºMM'.mmm W
 * 
 * 
 * ********************************************************************************/

    static  latString(lat) {
        var str = GPSPoint.toDMDecimal(Math.abs(lat));
        if (lat < 0)
            str += "S  ";
        else
            str += "N  ";

        return str;
    }
    static  lonString(lon) {
        var str = GPSPoint.toDMDecimal(Math.abs(lon));
        if (lon < 0)
            str += "W";
        else
            str += "E";

        return str;
    }


    /************************************************************************************
     * 
     * These static routines will format the GPS coordinates as either:
     * 
     *  Degree/Minute/Second (toDMS) DDºMM'sss" N/S
     * 
     * -or-
     * 
     * Degree/Decimal Minutes (toDMDecimal) DDºMM'.mmm N/S
     * 
     * ********************************************************************************/

    // formats a coordinate as a Degrees-Minutes-Seconds string 
    static  toDMS(ptCoord) {
        var d = Math.trunc(ptCoord);
        var m = Math.trunc((ptCoord - d) * 60);
        var s = ((ptCoord - d) * 60 - m) * 60;
        return d.toString() + "° " + Math.abs(m).toString() + "′ " + Math.abs(s).toFixed(2) + "″";
    }
    static  toDMDecimal(ptCoord) {
        var d = Math.trunc(ptCoord); // integer part is Degrees
        var m = (ptCoord - d) * 60; // fractional part in minutes
        return d.toString() + "° " + Math.abs(m).toFixed(3) + "'";

    }

    // 32° 22.8' N
    static  parseDMSString(coord) {
        var matches = coord.match(/(\d\d)° (\d\d.\d)' (N|S|E|W)/);
        var latlon = parseInt(matches[1]) + parseFloat(matches[2]) / 60;
        if ((matches[3] == "W") || (matches[3] == "S")) latlon *= -1;
        return latlon;

    }

}