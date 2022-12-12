<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
<xsl:template match="/">
<html>
	<table border="1">
		<tr>
			<th> project Name</th>
			<th>Project Description</th>
			<th>Technology to be used</th>
			<th>Deadline</th>
			<th>Mentor name</th>
			<th>Course Code</th>
		</tr>
		<xsl:for-each select="projects/project">
		<xsl:sort select="projectName"/>
			<tr>
				<td><xsl:value-of select="projectName"/></td>
				<td><xsl:value-of select="projectDes"/></td>
				<td><xsl:value-of select="techUsed"/></td>
				<td><xsl:value-of select="deadline"/></td>
				<td><xsl:value-of select="mentorName"/></td>
				<td><xsl:value-of select="courseCode"/></td>
			</tr>
		</xsl:for-each>
	</table>
</html></xsl:template></xsl:stylesheet>