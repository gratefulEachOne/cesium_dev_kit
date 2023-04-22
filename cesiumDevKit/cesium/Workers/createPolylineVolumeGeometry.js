define(["./when-ad3237a0","./Cartesian2-08065eec","./arrayRemoveDuplicates-707c233c","./BoundingRectangle-8fed902e","./Transforms-1142ce48","./ComponentDatatype-a867ddaa","./PolylineVolumeGeometryLibrary-0e3fa363","./Check-be2d5acb","./GeometryAttribute-da891979","./GeometryAttributes-27dc652d","./GeometryPipeline-3334f964","./IndexDatatype-9504f550","./Math-5ca9b250","./PolygonPipeline-ac773b7c","./VertexFormat-fc4fc84a","./combine-1510933d","./RuntimeError-767bd866","./WebGLConstants-1c8239cc","./EllipsoidTangentPlane-f8b1fc8b","./AxisAlignedBoundingBox-718a9087","./IntersectionTests-75083888","./Plane-bb88dd7e","./PolylinePipeline-05927ee2","./EllipsoidGeodesic-dc284f08","./EllipsoidRhumbLine-4a6ed5de","./AttributeCompression-9fbb8447","./EncodedCartesian3-a785c24c"],function(d,u,i,r,T,G,D,e,w,R,B,S,a,I,m,t,n,o,l,s,p,c,y,g,h,f,v){"use strict";function b(e){var t=(e=d.defaultValue(e,d.defaultValue.EMPTY_OBJECT)).polylinePositions,n=e.shapePositions;this._positions=t,this._shape=n,this._ellipsoid=u.Ellipsoid.clone(d.defaultValue(e.ellipsoid,u.Ellipsoid.WGS84)),this._cornerType=d.defaultValue(e.cornerType,D.CornerType.ROUNDED),this._vertexFormat=m.VertexFormat.clone(d.defaultValue(e.vertexFormat,m.VertexFormat.DEFAULT)),this._granularity=d.defaultValue(e.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";t=1+t.length*u.Cartesian3.packedLength;t+=1+n.length*u.Cartesian2.packedLength,this.packedLength=t+u.Ellipsoid.packedLength+m.VertexFormat.packedLength+2}b.pack=function(e,t,n){var a;n=d.defaultValue(n,0);var i=e._positions,r=i.length;for(t[n++]=r,a=0;a<r;++a,n+=u.Cartesian3.packedLength)u.Cartesian3.pack(i[a],t,n);var o=e._shape,r=o.length;for(t[n++]=r,a=0;a<r;++a,n+=u.Cartesian2.packedLength)u.Cartesian2.pack(o[a],t,n);return u.Ellipsoid.pack(e._ellipsoid,t,n),n+=u.Ellipsoid.packedLength,m.VertexFormat.pack(e._vertexFormat,t,n),n+=m.VertexFormat.packedLength,t[n++]=e._cornerType,t[n]=e._granularity,t};var P=u.Ellipsoid.clone(u.Ellipsoid.UNIT_SPHERE),E=new m.VertexFormat,_={polylinePositions:void 0,shapePositions:void 0,ellipsoid:P,vertexFormat:E,cornerType:void 0,granularity:void 0};b.unpack=function(e,t,n){t=d.defaultValue(t,0);for(var a=e[t++],i=new Array(a),r=0;r<a;++r,t+=u.Cartesian3.packedLength)i[r]=u.Cartesian3.unpack(e,t);var a=e[t++],o=new Array(a);for(r=0;r<a;++r,t+=u.Cartesian2.packedLength)o[r]=u.Cartesian2.unpack(e,t);var l=u.Ellipsoid.unpack(e,t,P);t+=u.Ellipsoid.packedLength;var s=m.VertexFormat.unpack(e,t,E);t+=m.VertexFormat.packedLength;var p=e[t++],c=e[t];return d.defined(n)?(n._positions=i,n._shape=o,n._ellipsoid=u.Ellipsoid.clone(l,n._ellipsoid),n._vertexFormat=m.VertexFormat.clone(s,n._vertexFormat),n._cornerType=p,n._granularity=c,n):(_.polylinePositions=i,_.shapePositions=o,_.cornerType=p,_.granularity=c,new b(_))};var k=new r.BoundingRectangle;return b.createGeometry=function(e){var t=e._positions,n=i.arrayRemoveDuplicates(t,u.Cartesian3.equalsEpsilon),a=e._shape,a=D.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(a);if(!(n.length<2||a.length<3)){I.PolygonPipeline.computeWindingOrder2D(a)===I.WindingOrder.CLOCKWISE&&a.reverse();t=r.BoundingRectangle.fromPoints(a,k);return function(e,t,n,a){var i=new R.GeometryAttributes;a.position&&(i.position=new w.GeometryAttribute({componentDatatype:G.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var r,o,l,s,p,c=t.length,d=e.length/3,u=(d-2*c)/(2*c),m=I.PolygonPipeline.triangulate(t),y=(u-1)*c*6+2*m.length,g=S.IndexDatatype.createTypedArray(d,y),h=2*c,f=0;for(L=0;L<u-1;L++){for(r=0;r<c-1;r++)p=(o=2*r+L*c*2)+h,s=(l=o+1)+h,g[f++]=l,g[f++]=o,g[f++]=s,g[f++]=s,g[f++]=o,g[f++]=p;s=(l=(o=2*c-2+L*c*2)+1)+h,p=o+h,g[f++]=l,g[f++]=o,g[f++]=s,g[f++]=s,g[f++]=o,g[f++]=p}if(a.st||a.tangent||a.bitangent){for(var v,b,P=new Float32Array(2*d),E=1/(u-1),_=1/n.height,k=n.height/2,C=0,L=0;L<u;L++){for(b=_*(t[0].y+k),P[C++]=v=L*E,P[C++]=b,r=1;r<c;r++)b=_*(t[r].y+k),P[C++]=v,P[C++]=b,P[C++]=v,P[C++]=b;b=_*(t[0].y+k),P[C++]=v,P[C++]=b}for(r=0;r<c;r++)b=_*(t[r].y+k),P[C++]=v=0,P[C++]=b;for(r=0;r<c;r++)b=_*(t[r].y+k),P[C++]=v=(u-1)*E,P[C++]=b;i.st=new w.GeometryAttribute({componentDatatype:G.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(P)})}var V=d-2*c;for(L=0;L<m.length;L+=3){var F=m[L]+V,x=m[L+1]+V,A=m[L+2]+V;g[f++]=F,g[f++]=x,g[f++]=A,g[f++]=A+c,g[f++]=x+c,g[f++]=F+c}if(e=new w.Geometry({attributes:i,indices:g,boundingSphere:T.BoundingSphere.fromVertices(e),primitiveType:w.PrimitiveType.TRIANGLES}),a.normal&&(e=B.GeometryPipeline.computeNormal(e)),a.tangent||a.bitangent){try{e=B.GeometryPipeline.computeTangentAndBitangent(e)}catch(e){D.oneTimeWarning("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}a.tangent||(e.attributes.tangent=void 0),a.bitangent||(e.attributes.bitangent=void 0),a.st||(e.attributes.st=void 0)}return e}(D.PolylineVolumeGeometryLibrary.computePositions(n,a,t,e,!0),a,t,e._vertexFormat)}},function(e,t){return(e=d.defined(t)?b.unpack(e,t):e)._ellipsoid=u.Ellipsoid.clone(e._ellipsoid),b.createGeometry(e)}});